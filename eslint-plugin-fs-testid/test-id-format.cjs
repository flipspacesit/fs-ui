'use strict'

// Shared by every Flipspaces web repo. Do not edit a copy — see README.md.
// Repo-specific behaviour belongs in the rule's options, never in this file.
//
// Written against the oldest ESLint in use (8.15): it touches only
// context.options, context.report and node.parent.

const { followsFormat, hintFor } = require('./formats.cjs')

const DEFAULT_PROPS = ['data-testid']

// The parts of an id expression that can be read from the source, as
// { node, text, display }. Anything else (a variable, a call, `a && b`)
// yields nothing: the rule stays silent rather than guess.
function readableValues(node) {
  if (!node) return []
  switch (node.type) {
    case 'JSXExpressionContainer':
      return readableValues(node.expression)
    case 'Literal':
      return typeof node.value === 'string'
        ? [{ node, text: node.value, display: node.value }]
        : []
    case 'TemplateLiteral': {
      const head = node.quasis[0].value.cooked
      if (node.expressions.length === 0)
        return [{ node, text: head, display: head }]
      // `${prefix}-save` starts with something unknown.
      return head ? [{ node, text: head, display: `${head}\${…}` }] : []
    }
    case 'ConditionalExpression':
      return readableValues(node.consequent).concat(
        readableValues(node.alternate)
      )
    // testId || 'fallback', id && `x-${id}`, a ?? 'b': either side can be
    // the id that reaches the DOM.
    case 'LogicalExpression':
      return readableValues(node.left).concat(readableValues(node.right))
    default:
      return []
  }
}

function elementName(node) {
  if (node.type === 'JSXIdentifier') return node.name
  if (node.type === 'JSXMemberExpression') {
    const owner = elementName(node.object)
    return owner === null ? null : `${owner}.${node.property.name}`
  }
  return null
}

// The opening element an id belongs to: its own for an attribute, the
// nearest enclosing one for a { 'data-testid': … } object inside a prop.
function owningElement(node) {
  for (let current = node.parent; current; current = current.parent) {
    if (current.type === 'JSXOpeningElement') return current
  }
  return null
}

// What to tell the author to use instead, from the element's name and its
// own attributes. No element, or a name that says nothing: no format.
function hintForElement(opening) {
  const name = opening ? elementName(opening.name) : null
  if (name === null) return { format: null, alt: null }
  const attributes = []
  let inputType
  for (const attribute of opening.attributes) {
    if (
      attribute.type !== 'JSXAttribute' ||
      attribute.name.type !== 'JSXIdentifier'
    )
      continue
    attributes.push(attribute.name.name)
    if (attribute.name.name === 'type' && attribute.value) {
      const { value } = attribute
      const node =
        value.type === 'JSXExpressionContainer' ? value.expression : value
      if (node.type === 'Literal') inputType = node.value
    }
  }
  return hintFor(name, { attributes, inputType })
}

function isTestIdKey(property) {
  if (property.computed) return false
  const { key } = property
  return key.type === 'Literal' && key.value === 'data-testid'
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'require test ids to follow the formats the Playwright suite builds its locators from',
    },
    schema: [
      {
        type: 'object',
        properties: {
          props: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      formatFor:
        '"{{value}}" does not follow a test-id format. Use "{{format}}".',
      // The element could be either of two kinds (a MenuItem).
      formatEither:
        '"{{value}}" does not follow a test-id format. Use "{{format}}" or "{{alt}}".',
      // No element, or one whose name says nothing about its kind.
      formatGeneric:
        '"{{value}}" does not follow a test-id format. See AGENTS.md → Test IDs.',
    },
  },

  create(context) {
    const given = context.options[0] || {}
    // Added to the default, never instead of it: listing a repo's own prop
    // must not stop data-testid itself from being checked.
    const props = new Set(DEFAULT_PROPS.concat(given.props || []))

    function check(valueNode, opening) {
      for (const { node, text, display } of readableValues(valueNode)) {
        if (followsFormat(text)) continue
        const { format, alt } = hintForElement(opening)
        let messageId = 'formatGeneric'
        if (format !== null)
          messageId = alt === null ? 'formatFor' : 'formatEither'
        context.report({
          node,
          messageId,
          data: { value: display, format, alt },
        })
      }
    }

    return {
      JSXAttribute(node) {
        if (node.name.type !== 'JSXIdentifier' || !props.has(node.name.name))
          return
        check(node.value, node.parent)
      },
      // inputProps={{ 'data-testid': … }} and plain objects of props.
      Property(node) {
        if (isTestIdKey(node)) check(node.value, owningElement(node))
      },
    }
  },
}
