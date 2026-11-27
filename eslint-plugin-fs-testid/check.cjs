#!/usr/bin/env node
'use strict'

// Shared by every Flipspaces web repo. Do not edit a copy — see README.md.
//
// Lints the files this branch changed and reports only the two test-id
// rules, old code included ("whole changed file"). Used by `lint:testid`
// locally and by the PR workflow, so both give the same answer.
//
//   node eslint-plugin-fs-testid/check.cjs [--base <ref>] [--paths <dir>...]
//                                          [--exclude <glob>...]
//                                          [--markdown <file>] [--json <file>]
//
// Exit code: 0 no findings · 1 findings · 2 the check could not vouch for
// the changed files (it could not run, or could not read one of them).
//
// The one thing this must never do is say "no findings" about a file it
// did not actually lint. Every path below that cannot lint a file either
// stops with exit 2 or names the file in the report.

const { execFileSync, spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const RULES = {
  'fs-testid/require-test-id': 'missing',
  'fs-testid/test-id-format': 'wrongFormat',
}
const EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx'])
const NOT_APP_SOURCE =
  /\.(test|spec|stories)\.[jt]sx?$|\.d\.ts$|(^|\/)__(tests|mocks)__\//
const VALUE_FLAGS = new Set(['base', 'markdown', 'json'])
const MAX_ROWS = 50
const FILES_PER_RUN = 200
const BIG = 512 * 1024 * 1024

const toPosix = file => file.split(path.sep).join('/')
const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`

function fail(code, message) {
  const error = new Error(message)
  error.code = code
  return error
}

// "./src/" and "src" are the same directory; "." means the whole repo.
function normaliseDir(dir) {
  const clean = path.posix.normalize(toPosix(dir)).replace(/\/+$/, '')
  return clean === '.' ? '' : clean
}

// "./src/ui/**" and "src/ui/**" are the same glob.
function normaliseGlob(glob) {
  return toPosix(glob).replace(/^\.\//, '')
}

// Flags that take one or more values (`--paths src lib`), each tidied by
// its own function. A Map, so that `--constructor` is simply unknown.
const LIST_FLAGS = new Map([
  ['paths', normaliseDir],
  ['exclude', normaliseGlob],
])

// A mistyped option must stop the run. Falling back to a default would
// check the wrong directory and report it clean.
function parseArgs(argv) {
  const args = {
    base: process.env.TESTID_BASE || 'origin/develop',
    paths: [],
    exclude: [],
  }
  let flag = null
  let taken = 0
  const take = (name, value) => {
    taken += 1
    if (LIST_FLAGS.has(name)) args[name].push(LIST_FLAGS.get(name)(value))
    else args[name] = value
  }
  const closeFlag = () => {
    if (flag && taken === 0) throw fail('BAD_ARGS', `--${flag} needs a value`)
  }
  for (const token of argv) {
    if (token.startsWith('--')) {
      closeFlag()
      const equals = token.indexOf('=')
      const name = token.slice(2, equals === -1 ? undefined : equals)
      if (!LIST_FLAGS.has(name) && !VALUE_FLAGS.has(name))
        throw fail('BAD_ARGS', `unknown option --${name}`)
      flag = name
      taken = 0
      const inline = equals === -1 ? '' : token.slice(equals + 1)
      if (inline) take(name, inline)
      if (taken && !LIST_FLAGS.has(name)) flag = null
    } else if (flag && LIST_FLAGS.has(flag)) take(flag, token)
    else if (flag) {
      take(flag, token)
      flag = null
    } else throw fail('BAD_ARGS', `unexpected argument "${token}"`)
  }
  closeFlag()
  if (args.paths.length === 0) args.paths = ['src']
  return args
}

// A glob for --exclude, matched against the whole repo-relative path.
// `*` stays inside one folder name, `**` crosses folders, `**/` also stands
// for no folder at all, `?` is one character. Everything else is literal.
function globToRegExp(glob) {
  let source = ''
  for (let at = 0; at < glob.length; at += 1) {
    const char = glob[at]
    if (char === '*' && glob[at + 1] === '*') {
      const beforeSlash = glob[at + 2] === '/'
      source += beforeSlash ? '(?:.*/)?' : '.*'
      at += beforeSlash ? 2 : 1
    } else if (char === '*') source += '[^/]*'
    else if (char === '?') source += '[^/]'
    else source += char.replace(/[.+^${}()|[\]\\]/g, '\\$&')
  }
  return new RegExp(`^${source}$`)
}

// Excluding is the one way to keep a file under --paths out of the check:
// the rules are forced on from the command line, so no ESLint config can.
function isExcluded(file, globs) {
  const posix = toPosix(file)
  return globs.some(glob => globToRegExp(normaliseGlob(glob)).test(posix))
}

function isCheckedFile(file, paths) {
  const posix = toPosix(file)
  const inScope = paths.some(dir => {
    const prefix = normaliseDir(dir)
    return prefix === '' || posix.startsWith(`${prefix}/`)
  })
  return (
    inScope &&
    EXTENSIONS.has(path.extname(posix)) &&
    !NOT_APP_SOURCE.test(posix)
  )
}

// Always an argument array, never a shell string: paths may contain spaces.
function git(args, cwd) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    maxBuffer: BIG,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

const nulList = output => output.split('\0').filter(Boolean)

// What the branch changed, plus what is changed but not yet committed, so a
// local run before committing sees the same files CI will.
// -M100% turns a rename with no edits into an "R" entry, which the ACM
// filter drops: moving a file is not touching its contents.
function listChangedFiles(base, cwd) {
  try {
    git(['rev-parse', '--verify', '--quiet', `${base}^{commit}`], cwd)
  } catch (_error) {
    throw fail('NO_BASE', `base ref "${base}" not found`)
  }
  const diff = ['diff', '--name-only', '-z', '-M100%', '--diff-filter=ACM']
  const files = new Set(
    nulList(git(diff.concat(`${base}...HEAD`), cwd))
      .concat(nulList(git(diff.concat('HEAD'), cwd)))
      .concat(
        nulList(git(['ls-files', '-z', '--others', '--exclude-standard'], cwd))
      )
  )
  return Array.from(files)
    .filter(file => fs.existsSync(path.join(cwd, file)))
    .sort()
}

// The files ESLint actually runs. A repo on .eslintrc installs this folder
// as a dependency, and the package manager copies it into node_modules.
const RULE_FILES = [
  'index.cjs',
  'formats.cjs',
  'require-test-id.cjs',
  'test-id-format.cjs',
]

// Null when ESLint will run the rules in `pluginDir`, or a sentence saying
// why not. A repo that loads the folder by path has no installed copy; a
// repo that installs it has a copy, which is only as new as its last
// install. Checking a branch with last month's rules would give an answer
// CI does not agree with.
function installedCopyProblem(pluginDir, root) {
  // Only the repo's own node_modules: a package of this name further up
  // the disk is not this repo's to reinstall.
  const installed = path.join(root, 'node_modules', 'eslint-plugin-fs-testid')
  if (!fs.existsSync(installed)) return null
  if (fs.realpathSync(installed) === fs.realpathSync(pluginDir)) return null
  const read = file => {
    try {
      return fs.readFileSync(file)
    } catch (_error) {
      return null
    }
  }
  const same = RULE_FILES.every(file => {
    const theirs = read(path.join(installed, file))
    const ours = read(path.join(pluginDir, file))
    return theirs !== null && ours !== null && theirs.equals(ours)
  })
  return same
    ? null
    : "the installed copy of eslint-plugin-fs-testid differs from the folder in this repo: run your package manager's install"
}

const NOT_CONFIGURED =
  'the fs-testid rules are not configured for this file: make the ESLint config cover it, or pass --exclude'

function resolveEslint(cwd) {
  return path.dirname(require.resolve('eslint/package.json', { paths: [cwd] }))
}

// True when ESLint's computed config for a file has both rules in it, at
// any severity (the check forces them on; what matters is that the repo's
// test-id block, and so its options, reach the file). `config` is what
// calculateConfigForFile returns: undefined for a file nothing covers.
function rulesConfigured(config) {
  const rules = (config && config.rules) || {}
  return Object.keys(RULES).every(ruleId => rules[ruleId] !== undefined)
}

// ESLint 8.57 and later export loadESLint, which picks the class for the
// kind of config the repo has. Older versions only have the one class.
function pickEslintClass(eslintModule, cwd) {
  return typeof eslintModule.loadESLint === 'function'
    ? eslintModule.loadESLint({ cwd })
    : eslintModule.ESLint
}

// Runs in a child process (see readConfigs): ESLint's API is asynchronous
// and main() is not.
async function describeFiles(files, cwd) {
  const Engine = await pickEslintClass(require(resolveEslint(cwd)), cwd)
  const engine = new Engine({ cwd })
  const answers = []
  for (const file of files) {
    const absolute = path.join(cwd, file)
    let ignored = await engine.isPathIgnored(absolute)
    // Flat config answers "ignored" both when an ignore pattern matches the
    // file and when no config block names it at all. Only the first is the
    // repo's choice; the second is a file nothing would have linted.
    if (ignored && (await noConfigMatches(engine, absolute))) ignored = false
    const configured =
      !ignored &&
      rulesConfigured(await engine.calculateConfigForFile(absolute))
    answers.push({ file, ignored, configured })
  }
  return answers
}

async function noConfigMatches(engine, absolute) {
  const [result] = await engine.lintText('', {
    filePath: absolute,
    warnIgnored: true,
  })
  const message = result && result.messages[0] ? result.messages[0].message : ''
  return /no matching configuration/i.test(message)
}

// What happens to each changed file, from ESLint's answers. Driven by the
// list of files, not by the answers: a file ESLint said nothing about must
// show up as unchecked, never drop out.
function sortByConfig(files, answers) {
  const answerFor = new Map(answers.map(answer => [answer.file, answer]))
  const sorted = { lintable: [], ignored: [], unconfigured: [], unanswered: [] }
  for (const file of files) {
    const answer = answerFor.get(file)
    if (!answer) sorted.unanswered.push(file)
    else if (answer.ignored) sorted.ignored.push(file)
    else if (answer.configured) sorted.lintable.push(file)
    else sorted.unconfigured.push(file)
  }
  return sorted
}

// The files that were handed to ESLint and are missing from its results.
function missingResults(files, results, cwd) {
  const linted = new Set(
    results.map(result => toPosix(path.relative(cwd, result.filePath)))
  )
  return files.filter(file => !linted.has(toPosix(file)))
}

// Asks the repo's ESLint, without linting, what it would do with each file:
// ignore it, or lint it with the two rules configured. A file that is
// neither must not be linted here: under .eslintrc the forced `--rule`
// below would run the rules on it with their default options, and under
// flat config it would stop the whole run.
function readConfigs(files, cwd) {
  const run = spawnSync(process.execPath, [__filename, '--internal-config'], {
    cwd,
    input: files.join('\0'),
    encoding: 'utf8',
    maxBuffer: BIG,
  })
  let answers = null
  try {
    answers = JSON.parse(run.stdout)
  } catch (_error) {
    answers = null
  }
  if (run.status !== 0 || !Array.isArray(answers)) {
    const detail = String(run.stderr || run.stdout || run.error || '').trim()
    const firstLines = detail.split('\n').slice(0, 5).join('\n')
    throw new Error(`ESLint could not load its config.\n${firstLines}`)
  }
  return answers
}

// The repo's own ESLint and config, so the options set there apply.
//
// --no-inline-config: a blanket /* eslint-disable */ must not exempt a
// file; findDirective() honours the targeted, reasoned ones instead.
//
// --rule … warn: a severity on its own keeps the options from the config,
// and it makes ESLint refuse to run on a file whose config does not load
// the plugin. Without it, a changed file outside the config's test-id block
// would lint "clean" simply because the rules were never applied to it.
//
// ESLint exits 1 whenever any rule reports an error, so only output that
// is not a JSON array means it failed to run.
function runEslint(files, cwd) {
  const bin = path.join(resolveEslint(cwd), 'bin', 'eslint.js')
  const flags = ['--format', 'json', '--no-inline-config']
  for (const ruleId of Object.keys(RULES)) flags.push('--rule', `${ruleId}: warn`)
  const results = []
  for (let start = 0; start < files.length; start += FILES_PER_RUN) {
    const batch = files.slice(start, start + FILES_PER_RUN)
    const run = spawnSync(process.execPath, [bin].concat(flags, batch), {
      cwd,
      encoding: 'utf8',
      maxBuffer: BIG,
    })
    let parsed = null
    try {
      parsed = JSON.parse(run.stdout)
    } catch (_error) {
      parsed = null
    }
    if (!Array.isArray(parsed)) {
      const detail = String(run.stderr || run.stdout || run.error || '').trim()
      if (/could not find plugin "fs-testid"/i.test(detail))
        throw new Error(
          'A changed file under --paths is not covered by the fs-testid rules in the ESLint config. Make the config block and --paths agree.'
        )
      const firstLines = detail.split('\n').slice(0, 5).join('\n')
      throw new Error(`ESLint did not run (exit ${run.status}).\n${firstLines}`)
    }
    results.push(...parsed)
  }
  return results
}

// The reason, when `text` holds a disable directive that names this rule
// and explains itself; otherwise null.
function directiveReason(text, keyword, ruleId) {
  const at = text.indexOf(keyword)
  if (at === -1) return null
  const rest = text.slice(at + keyword.length).replace(/\*\/\}?\s*$/, '')
  const split = rest.indexOf(' -- ')
  if (split === -1) return null
  const rules = rest
    .slice(0, split)
    .split(',')
    .map(rule => rule.trim())
  const reason = rest.slice(split + 4).trim()
  return rules.includes(ruleId) && reason ? reason : null
}

// `line` is 1-based, as ESLint reports it.
function findDirective(lines, line, ruleId) {
  return (
    directiveReason(lines[line - 1] || '', 'eslint-disable-line', ruleId) ||
    directiveReason(lines[line - 2] || '', 'eslint-disable-next-line', ruleId)
  )
}

// Sorts ESLint's results into what was found and what could not be looked
// at. `filesChecked` counts only files the two rules really ran on.
function classifyResults(results, readLines, cwd) {
  const report = {
    filesChecked: 0,
    missing: [],
    wrongFormat: [],
    skipped: [],
    unparsed: [],
    ignored: [],
    excluded: [],
  }
  for (const result of results) {
    const file = toPosix(path.relative(cwd, result.filePath))
    let lines = null
    let linted = true
    let rulesMissing = false
    for (const message of result.messages) {
      if (message.fatal) {
        report.unparsed.push({ file, message: message.message })
        linted = false
        continue
      }
      // ESLint's own note that it skipped the file (ignore pattern, or no
      // config matches it).
      if (message.ruleId == null && /^File ignored/.test(message.message)) {
        report.ignored.push({ file, message: 'ignored by the ESLint config' })
        linted = false
        continue
      }
      const bucket = RULES[message.ruleId]
      if (!bucket) continue
      // An eslintrc config that names the rules without loading the plugin.
      if (/^Definition for rule .+ not found/.test(message.message)) {
        rulesMissing = true
        continue
      }
      if (lines === null) lines = readLines(result.filePath)
      const finding = {
        file,
        line: message.line,
        ruleId: message.ruleId,
        message: message.message,
      }
      const reason = findDirective(lines, message.line, message.ruleId)
      if (reason) report.skipped.push(Object.assign({ reason }, finding))
      else report[bucket].push(finding)
    }
    if (rulesMissing) {
      report.unparsed.push({
        file,
        message: 'the fs-testid rules are not loaded for this file',
      })
      linted = false
    }
    if (linted) report.filesChecked += 1
  }
  return report
}

const countFindings = report =>
  report.missing.length + report.wrongFormat.length

// Findings outrank everything; otherwise a file that could not be read
// means the check cannot say the change is clean.
function exitCode(report) {
  if (countFindings(report)) return 1
  return report.unparsed.length ? 2 : 0
}

// What the PR workflow needs: the status to set and whether there is
// anything a reviewer should be shown.
function summarise(report) {
  const counts = {
    findings: countFindings(report),
    missing: report.missing.length,
    wrongFormat: report.wrongFormat.length,
    skipped: report.skipped.length,
    unparsed: report.unparsed.length,
    ignored: report.ignored.length,
    excluded: report.excluded.length,
    filesChecked: report.filesChecked,
  }
  const code = exitCode(report)
  let description
  if (code === 1) {
    description = `${counts.missing} missing, ${counts.wrongFormat} wrong format`
    if (counts.skipped) description += `, ${counts.skipped} skipped`
    if (counts.unparsed) description += `, ${counts.unparsed} not checked`
  } else if (code === 2) {
    description = `${plural(counts.unparsed, 'file')} could not be checked`
  } else {
    description = 'No findings in changed files'
    if (counts.skipped)
      description += ` · ${counts.skipped} skipped by disable comment`
    if (counts.ignored) description += ` · ${counts.ignored} not linted`
    if (counts.excluded) description += ` · ${counts.excluded} excluded`
  }
  return Object.assign(counts, {
    state: ['success', 'failure', 'error'][code],
    description,
    comment: Boolean(
      counts.findings || counts.skipped || counts.unparsed || counts.ignored
    ),
  })
}

function headline(report) {
  const count = countFindings(report)
  if (count) return `Test IDs — ${plural(count, 'finding')} in changed files`
  if (report.unparsed.length)
    return `Test IDs — ${plural(report.unparsed.length, 'file')} could not be checked`
  return 'Test IDs — no findings in changed files'
}

const at = item => `${item.file}:${item.line}`
const SECTIONS = [
  ['missing', 'Missing', at, 'message'],
  ['wrongFormat', 'Wrong format', at, 'message'],
  ['skipped', 'Skipped by disable comment', at, 'reason'],
  ['unparsed', 'Could not check', item => item.file, 'message'],
  ['ignored', 'Not linted by ESLint', item => item.file, 'message'],
  ['excluded', 'Excluded from the check', item => item.file, 'message'],
]
const RENAME_REMINDER =
  "Renaming an id? Update this repo's tests in the same PR and search vizdom.test.suite for the old value."

// One renderer for both outputs; `style` only decides the punctuation.
function render(report, style) {
  const out = [style.heading(report), '']
  for (const [key, title, where, detail] of SECTIONS) {
    const items = report[key]
    if (items.length === 0) continue
    out.push(style.section(`${title} (${items.length})`))
    for (const item of items.slice(0, MAX_ROWS))
      out.push(style.row(where(item), item[detail]))
    if (items.length > MAX_ROWS)
      out.push(style.more(`… ${items.length - MAX_ROWS} more`))
    if (key === 'wrongFormat') out.push('', RENAME_REMINDER)
    out.push('')
  }
  out.push(style.footer(report))
  return out.join('\n')
}

function renderText(report) {
  return render(report, {
    heading: r => `${headline(r)} (${r.filesChecked} checked)`,
    section: title => title,
    row: (where, detail) => `  ${where}  ${detail}`,
    more: text => `  ${text}`,
    footer: () => 'Formats: AGENTS.md → Test IDs.',
  })
}

// Messages contain <Button> and quotes: inline code keeps them literal.
const code = text => `\`${String(text).replace(/`/g, "'")}\``

function renderMarkdown(report) {
  return render(report, {
    heading: r => `## ${exitCode(r) ? '❌' : '✅'} ${headline(r)}`,
    section: title => `**${title}**\n`,
    row: (where, detail) => `- ${code(where)} — ${code(detail)}`,
    more: text => `- ${text}`,
    footer: r =>
      `Every interactive element in a file you change needs a test id in one of the agreed formats. ${plural(r.filesChecked, 'file')} checked.\nFormats: AGENTS.md → Test IDs.`,
  })
}

function main(argv, cwd) {
  const from = cwd || process.cwd()
  try {
    const args = parseArgs(argv)
    const root = git(['rev-parse', '--show-toplevel'], from).trim()
    // A mistyped folder would match no changed file and pass every run.
    for (const dir of args.paths) {
      const folder = path.join(root, dir)
      if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory())
        throw fail(
          'BAD_ARGS',
          `--paths: "${dir}" is not a folder in this repository`
        )
    }
    const changed = listChangedFiles(args.base, root).filter(file =>
      isCheckedFile(file, args.paths)
    )
    // An excluded file is a standing choice of the repo (it is written in
    // the command that runs this): named in the report, not linted, and not
    // by itself something a reviewer has to be shown.
    const excluded = changed.filter(file => isExcluded(file, args.exclude))
    const files = changed.filter(file => !excluded.includes(file))
    const stale = files.length ? installedCopyProblem(__dirname, root) : null
    if (stale) throw new Error(stale)
    const sorted = sortByConfig(
      files,
      files.length ? readConfigs(files, root) : []
    )
    const results = sorted.lintable.length
      ? runEslint(sorted.lintable, root)
      : []
    const report = classifyResults(
      results,
      file => fs.readFileSync(file, 'utf8').split(/\r?\n/),
      root
    )
    const unchecked = (list, message) =>
      list.forEach(file => report.unparsed.push({ file, message }))
    sorted.ignored.forEach(file =>
      report.ignored.push({ file, message: 'ignored by the ESLint config' })
    )
    unchecked(sorted.unconfigured, NOT_CONFIGURED)
    unchecked(sorted.unanswered, 'ESLint gave no answer about this file')
    unchecked(
      missingResults(sorted.lintable, results, root),
      'ESLint returned no result for this file'
    )
    report.excluded = excluded.map(file => ({
      file,
      message: 'matches --exclude',
    }))
    console.log(
      changed.length
        ? renderText(report)
        : 'Test IDs: no changed UI source files.'
    )
    if (args.markdown)
      fs.writeFileSync(path.resolve(from, args.markdown), renderMarkdown(report))
    if (args.json)
      fs.writeFileSync(
        path.resolve(from, args.json),
        JSON.stringify(summarise(report))
      )
    return exitCode(report)
  } catch (error) {
    if (error.code === 'NO_BASE')
      console.log(
        `Test IDs: ${error.message}. Run "git fetch origin" or pass --base.`
      )
    else if (error.code === 'BAD_ARGS')
      console.log(`Test IDs: ${error.message}.`)
    else console.log(`Test IDs: could not run. ${error.message}`)
    return 2
  }
}

module.exports = {
  parseArgs,
  isCheckedFile,
  globToRegExp,
  isExcluded,
  installedCopyProblem,
  rulesConfigured,
  pickEslintClass,
  readConfigs,
  sortByConfig,
  missingResults,
  listChangedFiles,
  runEslint,
  findDirective,
  classifyResults,
  summarise,
  renderText,
  renderMarkdown,
  main,
}

if (require.main === module) {
  if (process.argv[2] === '--internal-config') {
    // The child side of readConfigs: file names on stdin, answers on stdout.
    describeFiles(nulList(fs.readFileSync(0, 'utf8')), process.cwd()).then(
      answers => process.stdout.write(JSON.stringify(answers)),
      error => {
        process.stderr.write(String((error && error.message) || error))
        process.exitCode = 1
      }
    )
  } else process.exit(main(process.argv.slice(2)))
}
