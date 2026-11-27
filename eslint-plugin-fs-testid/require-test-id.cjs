'use strict'

// Shared by every Flipspaces web repo. Do not edit a copy — see README.md.
// Repo-specific behaviour belongs in the rule's options, never in this file.
//
// Written against the oldest ESLint in use (8.15): it touches only
// context.options and context.report, so it also runs unchanged on 9 and 10.

const { hintFor } = require('./formats.cjs')

const NATIVE = new Set(['button', 'input', 'select', 'textarea', 'a'])

const DEFAULTS = {
  handlers: ['onClick', 'onChange'],
  // Interactive even when no handler is written on the element itself
  // (a submit button, a field registered through a form library).
  components: [
    'Button',
    'IconButton',
    'LoadingButton',
    'ButtonBase',
    'TextField',
    'Select',
    'Autocomplete',
    'Checkbox',
    'Radio',
    'Switch',
    'Tab',
    'MenuItem',
    'ToggleButton',
    'Slider',
    'TextInput',
    'TextArea',
    'SearchInput',
    'SelectInput',
    'AutoComplete',
    'DateInput',
    'RadioButton',
    'NumberStepper',
    'SegmentedToggle',
    'PinInput',
    'Dropdown',
    'SplitMenu',
  ],
  // Containers whose children carry the ids.
  ignore: ['Tabs', 'RadioGroup', 'ToggleButtonGroup'],
  testIdProps: [
    'data-testid',
    'testid',
    'testId',
    'dataTestId',
    'dataTestid',
    'dataTestIds',
  ],
  nestedProps: [
    'inputProps',
    'InputProps',
    'slotProps',
    'componentsProps',
    'SelectProps',
  ],
  forwardedSpreads: [
    'props',
    'rest',
    'restProps',
    'other',
    'others',
    'otherProps',
    'params',
  ],
}

const stringList = { type: 'array', items: { type: 'string' } }

function readOptions(given) {
  const options = given || {}
  return {
    handlers: new Set(options.handlers || DEFAULTS.handlers),
    components: new Set(DEFAULTS.components.concat(options.components || [])),
    ignore: new Set(DEFAULTS.ignore.concat(options.ignore || [])),
    testIdProps: new Set(options.testIdProps || DEFAULTS.testIdProps),
    nestedProps: new Set(options.nestedProps || DEFAULTS.nestedProps),
    forwardedSpreads: new Set(
      options.forwardedSpreads || DEFAULTS.forwardedSpreads
    ),
  }
}

// <Button> → "Button", <Styled.Button> → "Styled.Button", <svg:rect> → null.
function elementName(node) {
  if (node.type === 'JSXIdentifier') return node.name
  if (node.type === 'JSXMemberExpression') {
    const owner = elementName(node.object)
    return owner === null ? null : `${owner}.${node.property.name}`
  }
  return null
}

function attributeName(attribute) {
  const { name } = attribute
  return name.type === 'JSXNamespacedName'
    ? `${name.namespace.name}:${name.name.name}`
    : name.name
}

function keyName(property) {
  if (property.type !== 'Property' || property.computed) return null
  return property.key.type === 'Identifier'
    ? property.key.name
    : String(property.key.value)
}

// { 'data-testid': … } at any depth, so slotProps={{ htmlInput: { … } }} counts.
// A spread inside the object ({ ...params.inputProps, maxLength: 5 }) may
// bring the id with it, exactly as a variable would, so it counts too.
function holdsTestId(objectExpression) {
  return objectExpression.properties.some(
    property =>
      property.type !== 'Property' ||
      keyName(property) === 'data-testid' ||
      (property.value.type === 'ObjectExpression' &&
        holdsTestId(property.value))
  )
}

// A nested prop only fails when we can read it and the id is not there.
// inputProps={inputProps} cannot be read, so it is given the benefit.
function nestedPropMaySupplyId(attribute) {
  const { value } = attribute
  if (!value || value.type !== 'JSXExpressionContainer') return false
  const { expression } = value
  return expression.type !== 'ObjectExpression' || holdsTestId(expression)
}

// The attribute's value when it is written out (type="file", type={'file'}),
// undefined when it is computed or absent.
function literalValue(attribute) {
  const { value } = attribute
  if (!value) return undefined
  const node = value.type === 'JSXExpressionContainer' ? value.expression : value
  return node.type === 'Literal' ? node.value : undefined
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'require a test id on interactive JSX elements so Playwright can reach them',
    },
    schema: [
      {
        type: 'object',
        properties: {
          handlers: stringList,
          components: stringList,
          ignore: stringList,
          testIdProps: stringList,
          nestedProps: stringList,
          forwardedSpreads: stringList,
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missing:
        '<{{element}}> has no test id. Add one in the form "{{format}}".',
      // The element could be either of two kinds (a MenuItem).
      missingEither:
        '<{{element}}> has no test id. Add one in the form "{{format}}", or "{{alt}}".',
      // Nothing says what kind of element this is, so no format is guessed.
      missingGeneric:
        '<{{element}}> has no test id. Add one in an agreed format: see AGENTS.md → Test IDs.',
    },
  },

  create(context) {
    const options = readOptions(context.options[0])

    // {...props} may carry the caller's id; {...register('x')} or {...field}
    // never does, so only a plain forwarded-props identifier counts.
    const forwardsProps = argument =>
      argument.type === 'Identifier' &&
      (options.forwardedSpreads.has(argument.name) ||
        argument.name.endsWith('Props'))

    return {
      JSXOpeningElement(node) {
        const element = elementName(node.name)
        if (element === null) return
        const kind = element.split('.').pop()
        if (options.ignore.has(kind)) return

        const handlers = []
        const attributes = []
        let supplied = false
        let inputType

        for (const attribute of node.attributes) {
          if (attribute.type === 'JSXSpreadAttribute') {
            if (forwardsProps(attribute.argument)) supplied = true
            continue
          }
          const name = attributeName(attribute)
          attributes.push(name)
          if (options.handlers.has(name)) handlers.push(name)
          if (options.testIdProps.has(name)) supplied = true
          if (options.nestedProps.has(name) && nestedPropMaySupplyId(attribute))
            supplied = true
          if (name === 'type') inputType = literalValue(attribute)
        }

        const interactive =
          NATIVE.has(kind) ||
          handlers.length > 0 ||
          options.components.has(kind)
        if (!interactive || supplied) return
        if (kind === 'input' && inputType === 'hidden') return

        const { format, alt } = hintFor(element, {
          handlers,
          attributes,
          inputType,
        })
        let messageId = 'missingGeneric'
        if (format !== null)
          messageId = alt === null ? 'missing' : 'missingEither'
        context.report({
          node: node.name,
          messageId,
          data: { element, format, alt },
        })
      },
    }
  },
}
