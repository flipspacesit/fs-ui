import React, { useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { DocSection, ExampleBox } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { t } from "../docTokens";
import {
  SelectInput,
  TextInput,
  NumberStepper,
  Dialog,
  SideModal,
  ModalLayout,
} from "../../../src";

/** One row of the component → target-element mapping table. */
interface TargetRow {
  component: string;
  /** Where the bare `data-testid` value lands. */
  target: string;
  /** Suffixed ids stamped on interactive children, if any. */
  children?: string;
}

const TARGETS: TargetRow[] = [
  { component: "TextInput", target: "<input>" },
  { component: "TextArea", target: "<textarea>" },
  {
    component: "SearchInput",
    target: "<input>",
    children: "{id}-clear (clear button)",
  },
  {
    component: "SelectInput",
    target: "<input> (the trigger)",
    children: "{id}-option-{value}, {id}-search",
  },
  {
    component: "AutoComplete",
    target: "<input>",
    children: "{id}-option-{index}",
  },
  { component: "DateInput", target: "<input> (the field)" },
  { component: "Checkbox", target: '<input type="checkbox">' },
  { component: "RadioButton", target: '<input type="radio">' },
  { component: "Switch", target: '<input type="checkbox">' },
  {
    component: "PinCommentInput",
    target: "<input>",
    children: "{id}-send (send button)",
  },
  {
    component: "PinInput",
    target: "root",
    children: "{id}-0 … {id}-{length-1} (digit cells)",
  },
  {
    component: "NumberStepper",
    target: "root",
    children: "{id}-decrement, {id}-value, {id}-increment",
  },
  {
    component: "SegmentedToggle",
    target: "root",
    children: "{id}-{option.value} (each segment)",
  },
  {
    component: "MonthYearPicker",
    target: "root",
    children: "{id}-mode-{month|quarter|year}, {id}-period-{key}",
  },
  { component: "DateRangePicker", target: "root (calendar paper)" },
  {
    component: "FileUpload",
    target: "root",
    children: "{id}-input (hidden file input), {id}-remove",
  },
  { component: "CountryDropdown", target: "root (the trigger)" },
  { component: "Dropdown", target: "root (the trigger)" },
  {
    component: "Dialog",
    target: "root (dialog paper)",
    children: "{id}-close, {id}-back (back arrow)",
  },
  {
    component: "ModalLayout",
    target: "root (modal paper)",
    children: "{id}-close",
  },
  {
    component: "SideModal",
    target: "root (drawer paper)",
    children: "{id}-close, {id}-tab-{tab.value}",
  },
];

/** Monospace inline code, matching the PropsTable pill treatment. */
const Mono: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    component="code"
    className="doc-mono"
    sx={{
      fontSize: 12,
      backgroundColor: t.sunken,
      border: `1px solid ${t.border}`,
      borderRadius: "6px",
      px: "6px",
      py: "2px",
      color: t.accent,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </Box>
);

const TestIdsDocs: React.FC = () => {
  const [status, setStatus] = useState("");
  const [qty, setQty] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState("details");

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Test IDs (<Box component="span" className="doc-mono">data-testid</Box>)
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Every fs-ui input control accepts a <code>data-testid</code> prop and
        renders it as a <code>data-testid</code> DOM attribute — a stable hook
        for end-to-end tests and analytics that does not depend on class names,
        labels, or markup structure.
      </Typography>

      <DocSection title="Usage">
        <ExampleBox>
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
            <TextInput data-testid="vendor-name" label="Vendor name" />
            <SelectInput
              data-testid="vendor-status"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as string)}
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              placeholder="Select status"
            />
            <NumberStepper data-testid="qty" value={qty} onChange={setQty} />
            <Typography variant="caption" color="text.secondary">
              Inspect the elements above — each carries its{" "}
              <code>data-testid</code>.
            </Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<TextInput data-testid="vendor-name" label="Vendor name" />

<SelectInput
  data-testid="vendor-status"
  label="Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  options={statusOptions}
/>

<NumberStepper data-testid="qty" value={qty} onChange={setQty} />`}
        />
      </DocSection>

      <DocSection
        title="Modals"
        description="Dialog, ModalLayout and SideModal put the bare value on their paper and suffix the chrome they own — the close button, the back arrow, the header tabs."
      >
        <ExampleBox>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Button variant="contained" onClick={() => setLayoutOpen(true)}>
              Open ModalLayout
            </Button>
            <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
              Open SideModal
            </Button>
          </Stack>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Approve invoice"
            backArrow
            data-testid="approve-invoice"
          >
            <Typography variant="body2">
              The paper is <code>approve-invoice</code>; the header buttons are{" "}
              <code>approve-invoice-back</code> and{" "}
              <code>approve-invoice-close</code>.
            </Typography>
          </Dialog>
          <ModalLayout
            open={layoutOpen}
            onClose={() => setLayoutOpen(false)}
            title="Edit BOQ line"
            data-testid="edit-boq"
            paperstyle={{ width: "520px", height: "auto" }}
          >
            <Typography variant="body2">
              The paper is <code>edit-boq</code>; the close button is{" "}
              <code>edit-boq-close</code>. Any <code>PaperProps</code> you pass
              is merged, not replaced.
            </Typography>
          </ModalLayout>
          <SideModal
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Filters"
            data-testid="filters"
            tabs={[
              { label: "Details", value: "details" },
              { label: "History", value: "history" },
            ]}
            activeTab={drawerTab}
            onTabChange={setDrawerTab}
          >
            <Typography variant="body2">
              Tabs are <code>filters-tab-details</code> and{" "}
              <code>filters-tab-history</code>.
            </Typography>
          </SideModal>
        </ExampleBox>
        <CodeBlock
          code={`<Dialog open={open} onClose={close} title="Approve invoice" backArrow
  data-testid="approve-invoice">
  …
</Dialog>

// paper           → [data-testid="approve-invoice"]
// close button    → [data-testid="approve-invoice-close"]
// back arrow      → [data-testid="approve-invoice-back"]

await page.click('[data-testid="approve-invoice-close"]')
await expect(page.locator('[data-testid="approve-invoice"]')).toBeHidden()`}
        />
      </DocSection>

      <DocSection
        title="One element per value"
        description="A given data-testid is rendered on exactly one element, so a [data-testid='x'] selector never matches twice."
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Controls that own a single focusable input put the value on that{" "}
          <code>&lt;input&gt;</code> — so you can type into it, assert its value,
          or check it directly. Composite controls (segments, PIN cells, stepper
          buttons) put the bare value on their root and stamp{" "}
          <strong>suffixed</strong> ids on the interactive children, because a
          root-only attribute would give you nothing to click.
        </Typography>
        <CodeBlock
          code={`// Single-input control → the value is ON the input
await page.fill('[data-testid="vendor-name"]', 'Saigon Interiors')

// Composite control → root carries the bare id, children carry suffixes
await page.click('[data-testid="qty-increment"]')
await expect(page.locator('[data-testid="qty-value"]')).toHaveText('2')

// SelectInput: open the trigger, then pick an option by its value
await page.click('[data-testid="vendor-status"]')
await page.click('[data-testid="vendor-status-option-active"]')

// FileUpload: target the hidden input, not the dropzone
await page.setInputFiles('[data-testid="invoice-doc-input"]', 'invoice.pdf')`}
        />
      </DocSection>

      <DocSection
        title="Where the attribute lands"
        description="Per-component target element and the suffixed ids each one emits."
      >
        <Box
          sx={{
            border: `1px solid ${t.border}`,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1.2fr 2fr",
              gap: 0,
              backgroundColor: t.sunken,
              px: 2,
              py: 1.25,
              borderBottom: `1px solid ${t.border}`,
            }}
          >
            {["Component", "data-testid lands on", "Child ids"].map((h) => (
              <Typography
                key={h}
                variant="caption"
                sx={{ fontWeight: 700, color: t.textMuted }}
              >
                {h}
              </Typography>
            ))}
          </Box>
          {TARGETS.map((row, i) => (
            <Box
              key={row.component}
              sx={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1.2fr 2fr",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1.25,
                borderBottom:
                  i === TARGETS.length - 1 ? "none" : `1px solid ${t.border}`,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {row.component}
              </Typography>
              <Box>
                <Mono>{row.target}</Mono>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {row.children ?? "—"}
              </Typography>
            </Box>
          ))}
        </Box>
      </DocSection>

      <DocSection
        title="Why an explicit prop"
        description="A wrong data-testid fails silently, so the prop is declared rather than left to rest-prop spreading."
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          TypeScript does not type-check hyphenated JSX attributes. A{" "}
          <code>data-testid</code> passed to a component that ignores it
          compiles cleanly and renders nothing — there is no error to catch it.
          Declaring <code>data-testid</code> on the props type means the library
          controls where it lands, and the docs can tell you which element that
          is.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Import <code>DataTestIdProps</code> when composing your own wrappers
          so the prop flows through:
        </Typography>
        <CodeBlock
          code={`import { TextInput, type DataTestIdProps } from '@flipspacesit/fs-ui'

interface VendorFieldProps extends DataTestIdProps {
  label: string
}

const VendorField = ({
  label,
  'data-testid': dataTestId,
}: VendorFieldProps) => (
  <TextInput label={label} data-testid={dataTestId} />
)`}
        />
      </DocSection>

      <DocSection title="Notes">
        <Stack spacing={1.5}>
          <Typography variant="body2" color="text.secondary">
            • Omitting <code>data-testid</code> renders no attribute at
            all — there is no default value and no markup cost.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Your own <code>inputProps</code> / <code>slotProps</code> are
            merged, not replaced: passing{" "}
            <code>inputProps={`{{ maxLength: 5 }}`}</code> alongside{" "}
            <code>data-testid</code> keeps both.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Suffixed child ids are derived from your value, so keep ids
            URL-safe and stable. For <code>SelectInput</code> and{" "}
            <code>SegmentedToggle</code> the suffix is the option{" "}
            <code>value</code> (not the label), so it survives copy changes and
            translation.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • <code>Dropdown</code> and <code>SplitMenu</code> predate this prop
            and keep their own <code>testid</code> / <code>dataTestIds</code>{" "}
            APIs, which build the attribute value for you rather than using it
            verbatim.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • The modals are the one place a value is emitted without your
            asking: <code>Dialog</code> and <code>ModalLayout</code> have always
            stamped <code>button-closeModal</code> (and{" "}
            <code>icon-backArrow</code>) on their header buttons. Passing{" "}
            <code>data-testid</code> replaces those literals with{" "}
            <code>{"{id}-close"}</code> / <code>{"{id}-back"}</code>; omitting it
            leaves them as they were, so existing suites keep resolving.
          </Typography>
        </Stack>
      </DocSection>
    </Box>
  );
};

export default TestIdsDocs;
