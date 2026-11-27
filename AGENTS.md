# AGENTS.md

Guidance for AI coding agents and developers working in this repository.

Commands, releasing, architecture and conventions are in [`CLAUDE.md`](CLAUDE.md). This file holds the one rule set every change to the library has to follow: test ids. The section below is also at the end of `CLAUDE.md`; a change to one goes into the other.

## Test IDs (`data-testid`) — required

The Playwright suite (`vizdom.test.suite`) finds elements through `data-testid` helpers that build ids from fixed formats. An element with no id, or an id in another shape, cannot be reached by those helpers. In the apps, most of those elements are components from this library, so where this library puts an id decides whether a test can reach them.

This applies to the library source, `src`. The docs site under `docs/` is a showcase and is not checked.

**Rules**

1. Every interactive element you add or touch gets a test id: buttons, inputs, selects, checkboxes, radios, tabs, menu items, links, and anything with `onClick` or `onChange`.
2. Every test id follows the formats below. In a file you change, the whole file must be clean, old code included, or the PR's "Test IDs" check goes red.
3. Also tag what a test would assert on: labels, read-only values, containers.
4. If no format fits, or the right name is unclear, ask. Do not invent a format. A new format goes into `vizdom.test.suite/docs/LOCATORS_FORMAT.md` first.
5. Dynamic parts come from a stable business value the row or entity already renders (`invoiceNumber`, `grnCode`, `itemName`, `fileName`). Keep domain acronyms as written (`PO`, `GRN`). Ids in one collection share a fixed prefix and differ only in the dynamic part.
6. Put the id on the existing element, through the prop its component supports. No wrapper elements, refactors, behaviour changes or style changes just to carry an id.
7. Write the id where it is used. Do not create a constant only to mirror one field into one or two ids. When an id's source changes, remove the old fallback keys, constants and compatibility branches everywhere they were used.
8. A correctly formatted id is never renamed or removed. A wrong-format id in a file you touch is renamed: search `vizdom.test.suite` and the consumer repos for the old value in the same change (this repo has no tests of its own to update). Never copy a legacy one-off id (`button`, `submit-success-close`) into new code.
9. Do not disable the lint rules to get to green. Run `npm run lint:testid` before saying the work is done; it checks every file your branch changed under `src` against `origin/master` (for another base branch: `npm run lint:testid -- --base origin/<branch>`).

**Formats** (source of truth: `vizdom.test.suite/docs/LOCATORS_FORMAT.md`)

| Element | Format | With a dynamic part |
|---|---|---|
| Button | `button-${name}` | `button-${name}-${value}` |
| Menu item | `menu-item-${name}` | |
| Radio button | `radio-button-${name}` | `radio-button-${name}-${value}` |
| Checkbox | `checkbox-${name}` | `checkbox-${name}-${value}` |
| Tab | `tab-${name}`; toggle tabs `toggle-tab-${name}` | |
| Icon | `icon-${name}` | `icon-${name}-${value}` |
| Text label | `label-${name}` | `label-${name}-${value}`, `label-${name}-${index}` |
| Link | `label-link-${name}` | `label-link-${name}-${value}` |
| Text field | `text-field-${name}` | `text-field-${name}-${index}` |
| Text area | `text-area-${name}` | `text-area-${name}-${value}` |
| Other input, such as a search box | `input-${name}` | `input-${dropdownName}-search` |
| Read-only value | `field-value-${name}` | |
| Container | `container-${name}` | `container-${name}-${value}`, `container-upload-${fieldName}` |
| Drag and drop | `drag-and-drop-${name}` | `drag-and-drop-${name}-${value}` |
| Row or card action | `action-${name}` | |
| Image | `image-thumbnail-${name}`, `image-card-${name}` | `image-card-${space}-${view}-${style}` |
| Date picker | `datepicker-${name}` | its input is `text-field-${name}` |
| Dropdown | `dropdown-${name}` | `dropdown-${name}-${value}`, `dropdown-${name}-${index}` |
| Dropdown option | `option-${dropdownName}-${value}` | or `dropdown-option-${exact option text}` |
| Accordion | `accordion-${name}` | |
| Pagination | `pagination-container` | page buttons are `button-previous-page`, `button-next-page`, `button-page-${pageNumber}` |
| Toast | `toast-title`, `toast-message`, `toast-close` | |
| Field row wrapper | `field-${name}` | identifies the row, not the input inside it |

The name after the prefix is camelCase (`button-saveDraft`).

**How a component in this library takes an id**

The contract is in `README.md` → "Test IDs". A render of all 18 components it names agreed with it when this section was written (version 2.11).

- Declare the prop with `DataTestIdProps` (`src/constants`) and thread it explicitly: `withDataTestId` for `inputProps`, `withDataTestIdSlot` for `slotProps.input` (`Checkbox`, `RadioButton`, `Switch`). Prop interfaces are closed and TypeScript does not check hyphenated JSX attributes, so an id passed to a component that does not declare the prop compiles and renders nothing.
- Put the bare id on exactly one element: the `<input>` of a single-input control, the root of a composite (`NumberStepper`, `PinInput`, `FileUpload`), the paper of a modal (`Dialog`, `ModalLayout`, `SideModal`, through `PaperProps`).
- Give an inner control a test drives the consumer's id plus a suffix, and only when the consumer gave an id: ``data-testid={dataTestId ? `${dataTestId}-clear` : undefined}``.
- A child id is a public contract. Add its row to the table in `README.md` → "Test IDs" in the same change. It reaches consumers only after a release.
- Older APIs build the value instead of using it as given: `Dropdown`'s `testid` (`dropdown-<testid>` on the trigger, `option-<testid>-<label or value>` on each option) and `SplitMenu`'s `dataTestIds`. `Dialog` and `ModalLayout` emit the literals `button-closeModal` and `icon-backArrow` when no id is passed. Do not change any of these.

**What the lint rule cannot see, and three findings that are not gaps**

- A clickable table row. `BodyRow` gets its handler through `{...getRowClickProps()}`, which the rule cannot read.
- `Dialog/index.tsx`: two wrappers carry `onClick` around an `IconButton` that already has the `-back` or `-close` id. `SelectInput/index.tsx`: the MUI `Autocomplete` is reported, although the id reaches the input through `renderInput`. When you touch those files, move the handler onto the tagged element or add a reasoned skip (below).

**Enforcement**

- **Lint rules:** `fs-testid/require-test-id` and `fs-testid/test-id-format`, as warnings in the editor and in `npm run lint`. They do not fail CI's Lint step.
- **Pull requests:** a "Test IDs" status and one comment, set by two steps in `.github/workflows/ci.yml`. The status goes red when a file the PR changed under `src` has an element with no id or an id in the wrong format, old code in that file included. The `build` job itself stays green.
- **Where the rules live:** `eslint-plugin-fs-testid/`, a copy shared by all Flipspaces web repos. Do not edit it here. The options for this repo are in `eslint.config.js`. The folder is not part of the published package.

To skip one element that a test can never need, name the rule and give a reason on the line above it. A blanket `eslint-disable` does not exempt a file, and every skip is listed for reviewers in the PR comment:

```jsx
{/* eslint-disable-next-line fs-testid/require-test-id -- wrapper only; the IconButton inside carries the id */}
```
