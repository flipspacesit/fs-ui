# eslint-plugin-fs-testid

**Version 1.1.0.** The canonical copy lives in `flip.vendors.web`. Every other Flipspaces web repo holds an identical copy of this folder.

**Do not edit this folder in a copy.** Make the change in `flip.vendors.web`, where the tests are (`tests/eslint-plugin-fs-testid/`), bump the version in `formats.cjs` and `package.json`, then copy the whole folder to the other repos. Anything that differs per repo goes in that repo's rule options, in its ESLint config.

## What it is for

The Playwright suite (`vizdom.test.suite`) finds elements through `data-testid` helpers that build ids from fixed formats. These rules make sure the ids exist and have that shape before a screen ships.

| File                  | What it does                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| `require-test-id.cjs` | Rule `fs-testid/require-test-id`: an interactive JSX element has no test id.                                    |
| `test-id-format.cjs`  | Rule `fs-testid/test-id-format`: a test id does not start with one of the agreed formats.                       |
| `formats.cjs`         | The accepted prefixes and the format suggested for each kind of element.                                        |
| `check.cjs`           | Lints the files a branch changed and reports only these two rules. Run by `lint:testid` and by the PR workflow. |
| `index.cjs`           | The plugin object ESLint loads.                                                                                 |

## The formats

The source of truth is `vizdom.test.suite/docs/LOCATORS_FORMAT.md`. A new format goes into that file first, then into `formats.cjs`, then to every repo.

## Wiring it into a repo

- **One config block** loads the plugin and sets both rules to `warn` for the repo's UI source. Give the block every extension that source uses, and put the repo's options there.
- **Keep the folder out of the repo's own tools.** Add it to the ESLint ignores and to `.prettierignore`, or whatever the formatter reads. A formatter that rewrites a copy makes it differ from every other copy.
- **Leave out of the block exactly what the check skips.** The check never looks at `*.test.*`, `*.spec.*`, `*.stories.*`, `*.d.ts`, or anything under `__tests__` or `__mocks__`. If the block leaves the same files out, the editor and the PR check agree. Any other file under `--paths` that the block leaves out has to be in `--exclude` too, or the check reports it as not configured.
- **Run the check** from a script (`lint:testid`) and from the PR workflow with the same `--paths` and `--exclude`.

## Options

`fs-testid/require-test-id`

| Option             | Meaning                                                                 | A value you give              |
| ------------------ | ----------------------------------------------------------------------- | ----------------------------- |
| `components`       | Components that are interactive even with no handler on them            | is added to the built-in list |
| `ignore`           | Components that never need an id (containers whose children carry them) | is added to the built-in list |
| `handlers`         | Props that make any element interactive. Default `onClick`, `onChange`  | replaces the default          |
| `testIdProps`      | Props that count as an id                                               | replaces the default          |
| `nestedProps`      | Props whose object may hold `data-testid` (`inputProps` and friends)    | replaces the default          |
| `forwardedSpreads` | Spread names treated as forwarding the caller's props                   | replaces the default          |

`fs-testid/test-id-format`

| Option  | Meaning                                                                                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `props` | Extra props whose value is a complete id and must follow the formats, such as a repo's own `dataTestid`. They are added to `data-testid`, which is always checked. |

## The check

```bash
node eslint-plugin-fs-testid/check.cjs --base origin/develop --paths src
```

It checks every file the branch added or edited under `--paths`, old code included, plus anything changed but not yet committed. A file that was only moved is skipped. Tests, stories, mocks and `.d.ts` files are skipped.

| Option                               | Meaning                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `--base <ref>`                       | What the branch is compared with. Default `origin/develop`, or `TESTID_BASE`.              |
| `--paths <dir>...`                   | Where the repo's UI source lives. Default `src`. A folder that does not exist is an error. |
| `--exclude <glob>...`                | Files under `--paths` that no test will ever drive, such as an in-app component showcase.  |
| `--markdown <file>`, `--json <file>` | Write the PR comment body and the summary the workflow reads.                              |

`--exclude` is how a repo keeps a file out of the check. The check switches both rules on from the command line, so an ESLint `off`, an `excludedFiles` or a second config block does not exempt a file. An ESLint ignore pattern does, but it takes the file out of all linting.

A glob is matched against the whole path from the repo root. `*` stays inside one folder name, `**` crosses folders, `**/` also stands for no folder at all (`src/**/a.js` matches `src/a.js`), and `?` is one character. There are no braces, character classes or negation: write one glob per pattern. A folder is written `src/demo/**`, not `src/demo`.

```bash
node eslint-plugin-fs-testid/check.cjs --paths src --exclude 'src/showcase/**' 'src/ui/**/examples.js'
```

| Exit code | Meaning                                                                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`       | No findings.                                                                                                                                                                                                  |
| `1`       | Findings.                                                                                                                                                                                                     |
| `2`       | The check cannot vouch for the change: it could not run, an option was wrong, a changed file could not be parsed or is not covered by the rules' config, or the installed copy of this folder is out of date. |

The check never reports a file as clean unless the two rules really ran on it:

- **`--paths` and the ESLint config must agree.** Before linting, the check asks ESLint for each changed file's own config. A file the two rules are not configured for is not linted: it is listed under "Could not check", and the result is exit `2`, or `1` when other files have findings. That includes a file no config block matches at all, which flat config would otherwise call "ignored". Under `.eslintrc.json`, give the override that sets the rules a `files` glob covering every extension the source uses, for example `src/**/*.{js,jsx,ts,tsx}`.
- A file an ESLint ignore pattern matches is listed under "Not linted by ESLint" and is not counted as checked.
- A file that cannot be parsed is listed under "Could not check".
- A file matched by `--exclude` is listed under "Excluded from the check" and is not counted as checked.

`--json` writes the counts plus `state` (`success`, `failure` or `error`), a one-line `description`, and `comment` (whether there is anything a reviewer should be shown). The PR workflow uses these three as they are.

A blanket `/* eslint-disable */` does not exempt a file. To skip one element, name the rule and give a reason on the line above it:

```jsx
{
  /* eslint-disable-next-line fs-testid/require-test-id -- hidden file input, driven by the button above */
}
```

Skipped elements are listed in the PR comment so reviewers see them.

## If the folder is installed as a dependency

A repo on `.eslintrc.json` cannot load a plugin from a path, so it lists this folder as a `file:` devDependency and its package manager copies it into `node_modules`. ESLint runs that copy. After the folder changes, run the package manager's install; until then the check stops with exit `2` and says so, rather than judging a branch with the previous release's rules.

This is verified with Bun, which copies the folder again on every install. Yarn 1 may report "up to date" without copying; a repo on Yarn has to confirm which command refreshes the copy (`yarn upgrade eslint-plugin-fs-testid` is the likely one) before it relies on this.

## What changed in 1.1.0

- **Messages no longer guess.** A format is named only when the element implies one. No finding is added or removed; only the wording changes.
  - A `MenuItem` is told `option-<dropdown>-<value>` when it has a `value`, `menu-item-<name>` when it has an `onClick`, and both when it has neither or both.
  - A search box (`SearchInput`, `SearchBar`) is told `input-<name>`.
  - An input is read by its `type` when that is written out: `checkbox`, `radio`, `search` and `submit` get their own format, and `file`, `range` and `color` get none, because the formats have no shape for them.
  - An element whose name says nothing gets a pointer to the formats table. The one exception is a missing id on something with `onClick`, which is still told `button-<name>`.
- **`--exclude <glob>...`** keeps files that no test will ever drive out of the check.
- **Each changed file's own ESLint config is read before linting.** A file the rules are not configured for is named under "Could not check". Before, it was linted with default options (`.eslintrc.json`), stopped the whole run (flat config, plugin not loaded for it) or passed as "ignored" (flat config, no block matching it).
- **A stale installed copy stops the check**, as described above.
- **Mistyped options stop the run.** A `--paths` folder that does not exist is an error, and so is any option followed by `=` and nothing.

To take this release in another repo: replace the whole folder, confirm it is identical to the canonical copy, and run the package manager's install if the repo installs it.
