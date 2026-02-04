# @flipspacesit/fs-ui

Flipspaces shared UI component library built with React, TypeScript, and Material-UI.

**[View Documentation](https://flipspacesit.github.io/fs-ui/)** | [GitHub](https://github.com/flipspacesit/fs-ui)

## Installation

### Using npm

```bash
npm install @flipspacesit/fs-ui
```

### Using GitHub Packages

First, authenticate with GitHub Packages by creating a `.npmrc` file:

```
@flipspacesit:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Then install:

```bash
npm install @flipspacesit/fs-ui
```

## Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@mui/material": "^5.0.0 || ^6.0.0 || ^7.0.0",
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "styled-components": "^6.0.0"
}
```

## Components

### Dropdown

A customizable dropdown component with search, icons, and custom popper support.

```tsx
import { Dropdown } from '@flipspacesit/fs-ui';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

<Dropdown
  options={options}
  value={selectedValue}
  onChange={(option) => setSelectedValue(option.value)}
  label="Select"
  size="medium"
  variant="round"
/>
```

### Button Components

```tsx
import { Button, OpenDropDownButton, DropDownApplyButton } from '@flipspacesit/fs-ui';

<Button variant="contained" color="primary">
  Click Me
</Button>

<OpenDropDownButton selected={isOpen}>
  Filter
</OpenDropDownButton>

<DropDownApplyButton onClick={handleApply}>
  Apply
</DropDownApplyButton>
```

### Accordion

```tsx
import { Accordion, AccordionGroup } from '@flipspacesit/fs-ui';

// Single Accordion
<Accordion title="Section 1">
  Content here
</Accordion>

// Accordion Group
<AccordionGroup
  items={[
    { title: 'Section 1', content: 'Content 1' },
    { title: 'Section 2', content: 'Content 2' },
  ]}
  allowMultiple={false}
/>
```

### Tag & StatusChip

```tsx
import { Tag, StatusChip } from '@flipspacesit/fs-ui';

<Tag
  label="Category"
  backgroundColor="#DEE7FF"
  color="#3361FF"
  borderColor="#3361FF"
/>

<StatusChip
  label="Active"
  status="success"
/>
```

### EllipsisTooltip

Automatically shows tooltip when text is truncated.

```tsx
import { EllipsisTooltip } from '@flipspacesit/fs-ui';

<EllipsisTooltip>
  This is a very long text that will be truncated...
</EllipsisTooltip>
```

### SplitMenu

Button with dropdown menu.

```tsx
import { SplitMenu } from '@flipspacesit/fs-ui';

<SplitMenu
  btnText="Actions"
  options={[
    { label: 'Edit', value: 'edit' },
    { label: 'Delete', value: 'delete' },
  ]}
  handleClick={(value) => console.log(value)}
/>
```

### ModalLayout

Reusable modal/dialog layout.

```tsx
import { ModalLayout } from '@flipspacesit/fs-ui';

<ModalLayout
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  footer={<Button onClick={handleSave}>Save</Button>}
>
  Modal content here
</ModalLayout>
```

### SearchInput

Search input with debouncing.

```tsx
import { SearchInput, useSearchInput } from '@flipspacesit/fs-ui';

// Controlled
<SearchInput
  value={searchValue}
  onChange={setSearchValue}
  placeholder="Search..."
  debounceMs={300}
/>

// With hook
const { value, debouncedValue, setValue, clear } = useSearchInput();
```

### Table Components

Styled table components.

```tsx
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledHeaderCell,
  StyledTableRow,
  StyledTableCell,
} from '@flipspacesit/fs-ui';

<StyledTableContainer>
  <StyledTable>
    <StyledTableHead>
      <StyledTableRow>
        <StyledHeaderCell>Name</StyledHeaderCell>
        <StyledHeaderCell>Value</StyledHeaderCell>
      </StyledTableRow>
    </StyledTableHead>
    <StyledTableBody>
      <StyledTableRow>
        <StyledTableCell>Item 1</StyledTableCell>
        <StyledTableCell>100</StyledTableCell>
      </StyledTableRow>
    </StyledTableBody>
  </StyledTable>
</StyledTableContainer>
```

### Loading Components

```tsx
import { LoadingSpinner, OverlayLoading, LoadingContainer } from '@flipspacesit/fs-ui';

// Full page loading
<LoadingSpinner fullPage message="Loading..." />

// Inline loading
<LoadingSpinner message="Loading data..." />

// Overlay loading
<OverlayLoading loading={isLoading} message="Saving...">
  <YourContent />
</OverlayLoading>
```

### useNotification Hook

Requires `notistack` SnackbarProvider in your app.

```tsx
import { SnackbarProvider } from 'notistack';
import { useNotification } from '@flipspacesit/fs-ui';

// Wrap your app
<SnackbarProvider maxSnack={3}>
  <App />
</SnackbarProvider>

// In your component
const { showSuccess, showError, showWarning, showInfo } = useNotification();

showSuccess('Operation completed!');
showError('Something went wrong');
showWarning('Please check your input');
showInfo('New update available');
```

## Constants

```tsx
import { HEIGHTS, FontSizeMap, ButtonBorderRadiusMap, Colors } from '@flipspacesit/fs-ui';

// HEIGHTS: { extraSmall, small, medium, large, extraLarge }
// FontSizeMap: Maps component sizes to typography variants
// ButtonBorderRadiusMap: Border radius for round/rectangular variants
// Colors: Common color tokens
```

## Icons

```tsx
import { ArrowDown, ArrowUp, CheckIcon, CloseIcon } from '@flipspacesit/fs-ui';

<ArrowDown size={16} color="#000" />
<ArrowUp size={16} color="#000" />
<CheckIcon size={16} color="#3361FF" />
<CloseIcon size={24} color="#1B1C1E" />
```

## CSS Variables

Some components use CSS variables for scaling. Set `--scale` in your root CSS:

```css
:root {
  --scale: 1;
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Lint
npm run lint
```

## Documentation

The documentation site includes live examples and API references for all components.

```bash
# Install docs dependencies
npm run docs:install

# Start docs dev server
npm run docs:dev

# Build docs for production
npm run docs:build
```

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Publishing to GitHub Packages

1. Update version in `package.json`
2. Build the library: `npm run build`
3. Publish: `npm publish`

## License

MIT
