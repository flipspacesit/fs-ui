'use strict'

// Shared by every Flipspaces web repo. Do not edit a copy — see README.md.
// Source of truth for the formats: vizdom.test.suite/docs/LOCATORS_FORMAT.md.
// A new format goes into that file first, then here, then to every repo.

const VERSION = '1.1.0'

// An id follows the formats when it starts with one of these. Longer shapes
// (label-link-, label-value-, dropdown-option-, container-upload-) are covered
// by the shorter prefix they begin with.
const PREFIXES = Object.freeze([
  'button-',
  'menu-item-',
  'radio-button-',
  'checkbox-',
  'tab-',
  'toggle-tab-',
  'icon-',
  'label-',
  'text-field-',
  'text-area-',
  'input-',
  'field-value-',
  'field-',
  'container-',
  'drag-and-drop-',
  'action-',
  'image-thumbnail-',
  'image-card-',
  'datepicker-',
  'dropdown-',
  'option-',
  'accordion-',
  'pagination-',
  'toast-',
  'modal-',
  'task-tableRow-',
])

const TEXT_FIELD = 'text-field-<name>'

// Element name → the format its kind takes. First match wins, so the order
// is load-bearing: RadioButton must hit "radio" before "button", SelectInput
// "dropdown" before "text field", IconButton "icon" before "button".
// A name that matches nothing here says nothing about the element, and no
// format is offered for it: a guessed prefix is worse than none, because an
// id that follows any format is never renamed again.
const NAMED = [
  [/Accordion/, 'accordion-<name>'],
  [/^textarea$|TextArea/, 'text-area-<name>'],
  [/Checkbox/, 'checkbox-<name>'],
  [/Radio/, 'radio-button-<name>'],
  [/Date(Time)?(Range)?(Picker|Input|Field)/, 'datepicker-<name>'],
  [/^(Styled)?(Table)?Pagination$/, 'pagination-container'],
  [/^select$|Dropdown|Select|Auto[Cc]omplete/, 'dropdown-<name>'],
  [/ToggleTab/, 'toggle-tab-<name>'],
  [/Tab$/, 'tab-<name>'],
  [/IconButton|Icon$/, 'icon-<name>'],
  [/^button$|Button|Btn/, 'button-<name>'],
  [/^a$|Link/, 'label-link-<name>'],
  // A search box is the formats' own example of "other input".
  [/Search(Input|Box|Bar|Field)/, 'input-<name>'],
  [/^input$|TextField|TextInput|Input$/, TEXT_FIELD],
]

// What an input is when its `type` is written out and is not text. `null`:
// the formats give that kind of input no shape of its own, so none is named.
const INPUT_TYPES = new Map([
  ['checkbox', 'checkbox-<name>'],
  ['radio', 'radio-button-<name>'],
  ['search', 'input-<name>'],
  ['submit', 'button-<name>'],
  ['button', 'button-<name>'],
  ['reset', 'button-<name>'],
  ['file', null],
  ['range', null],
  ['color', null],
  ['image', null],
])

const MENU_ITEM = /Menu(Item|Option)/
const MENU_ACTION = 'menu-item-<name>'
const DROPDOWN_OPTION = 'option-<dropdown>-<value>'

function followsFormat(value) {
  return (
    typeof value === 'string' &&
    PREFIXES.some(prefix => value.startsWith(prefix))
  )
}

// The format to name for an element, as { format, alt }.
//
// `elementName` may be dotted (Styled.Button); the last segment decides.
// `signals.attributes` are the names of the element's own JSX attributes,
// `signals.handlers` the handler props found on it, and `signals.inputType`
// its `type` attribute when that is written out as a string.
//
// `format` is null when nothing identifies the element's kind. The one
// fallback: something clickable acts as a button. `alt` is a second shape
// that may apply instead, set only when the element could be either.
function hintFor(elementName, signals) {
  const name = String(elementName).split('.').pop()
  const attributes = (signals && signals.attributes) || []
  const handlers = (signals && signals.handlers) || []

  // A MenuItem is an option of a dropdown (it carries a value) or an action
  // in a menu (it is clicked). Only its own attributes can say which.
  if (MENU_ITEM.test(name)) {
    const hasValue = attributes.includes('value')
    const hasClick = attributes.includes('onClick')
    if (hasValue && !hasClick) return { format: DROPDOWN_OPTION, alt: null }
    if (hasClick && !hasValue) return { format: MENU_ACTION, alt: null }
    return { format: MENU_ACTION, alt: DROPDOWN_OPTION }
  }

  const hit = NAMED.find(([pattern]) => pattern.test(name))
  if (hit) {
    const inputType = signals && signals.inputType
    // <input type="file"> is an input by name and not a text field by type.
    const format =
      hit[1] === TEXT_FIELD && INPUT_TYPES.has(inputType)
        ? INPUT_TYPES.get(inputType)
        : hit[1]
    return { format, alt: null }
  }
  const clickable = handlers.includes('onClick')
  return { format: clickable ? 'button-<name>' : null, alt: null }
}

module.exports = { VERSION, PREFIXES, followsFormat, hintFor }
