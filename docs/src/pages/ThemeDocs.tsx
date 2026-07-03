import React from "react";
import { Box, Typography, Stack, Paper, useTheme } from "@mui/material";
import { DocSection, ExampleBox } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { fontWeight } from "../../../src";

const ColorSwatch: React.FC<{ name: string; color: string; alias?: string }> = ({
  name,
  color,
  alias,
}) => (
  <Paper
    variant="outlined"
    sx={{
      p: 1,
      minWidth: 80,
      textAlign: "center",
    }}
  >
    <Box
      sx={{
        width: 50,
        height: 50,
        backgroundColor: color,
        borderRadius: 1,
        mx: "auto",
        mb: 1,
        border: "1px solid #E5E7EB",
      }}
    />
    <Typography variant="caption" display="block" fontWeight={500}>
      {name}
    </Typography>
    <Typography variant="caption" display="block" color="text.secondary">
      {color}
    </Typography>
    {alias && (
      <Typography
        variant="caption"
        display="block"
        color="text.secondary"
        sx={{ fontStyle: "italic", fontSize: 10 }}
      >
        {alias}
      </Typography>
    )}
  </Paper>
);

const ThemeDocs: React.FC = () => {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const palette = theme.palette as any;

  type Swatch = { name: string; color?: string; alias?: string };
  type ColorGroup = {
    name: string;
    note?: string;
    deprecated?: boolean;
    colors: Swatch[];
  };

  const colorGroups: ColorGroup[] = [
    {
      name: "Brand roles",
      note: "Semantic role tokens — each is an alias of a palette group below, not a separate color.",
      colors: [
        { name: "primary", color: palette.primary?.main, alias: "= yellow.brand" },
        {
          name: "secondary",
          color: palette.secondary?.main,
          alias: "= slateBlue.primary",
        },
      ],
    },
    {
      name: "Yellow",
      colors: [
        { name: "50", color: palette.yellow?.[50] },
        { name: "200", color: palette.yellow?.[200] },
        { name: "400", color: palette.yellow?.[400] },
        { name: "brand", color: palette.yellow?.brand },
        { name: "hover", color: palette.yellow?.hover },
        { name: "700", color: palette.yellow?.[700] },
        { name: "900", color: palette.yellow?.[900] },
      ],
    },
    {
      name: "SlateBlue",
      colors: [
        { name: "50", color: palette.slateBlue?.[50] },
        { name: "100", color: palette.slateBlue?.[100] },
        { name: "300", color: palette.slateBlue?.[300] },
        { name: "primary", color: palette.slateBlue?.primary },
        { name: "primaryDark", color: palette.slateBlue?.primaryDark },
        { name: "700", color: palette.slateBlue?.[700] },
        { name: "900", color: palette.slateBlue?.[900] },
      ],
    },
    {
      name: "Blue",
      note: "The design-system Blue — palette.primaryBlue.",
      colors: [
        { name: "50", color: palette.primaryBlue?.[50] },
        { name: "300", color: palette.primaryBlue?.[300] },
        { name: "500", color: palette.primaryBlue?.[500] },
        { name: "primary", color: palette.primaryBlue?.primary },
        { name: "700", color: palette.primaryBlue?.[700] },
        { name: "900", color: palette.primaryBlue?.[900] },
      ],
    },
    {
      name: "SoftSteel",
      colors: [
        { name: "50", color: palette.softSteel?.[50] },
        { name: "100", color: palette.softSteel?.[100] },
        { name: "200", color: palette.softSteel?.[200] },
        { name: "300", color: palette.softSteel?.[300] },
        { name: "400", color: palette.softSteel?.[400] },
      ],
    },
    {
      name: "Grey",
      colors: [
        { name: "50", color: palette.grey?.[50] },
        { name: "100", color: palette.grey?.[100] },
        { name: "200", color: palette.grey?.[200] },
        { name: "300", color: palette.grey?.[300] },
        { name: "400", color: palette.grey?.[400] },
      ],
    },
    {
      name: "Semantic",
      colors: [
        { name: "success", color: palette.success?.main },
        { name: "warning", color: palette.warning?.main },
        { name: "error", color: palette.error?.main },
        { name: "interactive", color: palette.interactive?.main },
      ],
    },
    {
      name: "Utility",
      colors: [
        { name: "white", color: palette.white?.main },
        { name: "black", color: palette.black?.main },
        { name: "border", color: palette.border?.main, alias: "= softSteel.400" },
        { name: "surface", color: palette.surface?.main },
      ],
    },
    {
      name: "Legacy (deprecated)",
      note: "Retained for backward compatibility only — migrate to the DS groups above.",
      deprecated: true,
      colors: [
        { name: "purple", color: palette.purple?.main },
        { name: "blue", color: palette.blue?.main },
        { name: "green", color: palette.green?.main },
        { name: "orange", color: palette.orange?.main },
        { name: "grey1", color: palette.grey1?.main },
        { name: "grey2", color: palette.grey2?.main },
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Theme
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The Flipspaces Design System theme provides consistent colors, typography,
        and component styling across all applications.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { theme } from '@flipspacesit/fs-ui';
import { ThemeProvider } from '@mui/material/styles';

// Wrap your app with ThemeProvider
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>`}
        />
      </DocSection>

      <DocSection title="Color Palette">
        <Typography variant="body2" sx={{ mb: 3 }}>
          The theme includes a comprehensive color palette with primary brand
          colors, semantic colors, and various shades for flexibility.
        </Typography>
        {colorGroups.map((group) => (
          <Box key={group.name} sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: group.note ? 0.25 : 1,
                ...(group.deprecated && { color: "text.secondary" }),
              }}
            >
              {group.name}
            </Typography>
            {group.note && (
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                {group.note}
              </Typography>
            )}
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              gap={1}
              sx={{ ...(group.deprecated && { opacity: 0.72 }) }}
            >
              {group.colors
                .filter((c) => c.color)
                .map((c) => (
                  <ColorSwatch
                    key={c.name}
                    name={c.name}
                    color={c.color as string}
                    alias={c.alias}
                  />
                ))}
            </Stack>
          </Box>
        ))}
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
          Brand split (by design): <strong>Yellow</strong> is the primary / action
          color (primary buttons, key CTAs), while <strong>Blue</strong> and{" "}
          <strong>Interactive</strong> drive secondary controls — switches,
          toggles, steppers and progress. The two-tone system is intentional, not
          an inconsistency.
        </Typography>
      </DocSection>

      <DocSection title="Typography Variants">
        <ExampleBox>
          <Stack spacing={2}>
            <Box>
              <Typography variant="t1">t1 - Title 1 (32px)</Typography>
            </Box>
            <Box>
              <Typography variant="h1">h1 - Heading 1 (24px)</Typography>
            </Box>
            <Box>
              <Typography variant="h2">h2 - Heading 2 (20px)</Typography>
            </Box>
            <Box>
              <Typography variant="h3">h3 - Heading 3 (16px)</Typography>
            </Box>
            <Box>
              <Typography variant="h4">h4 - Heading 4 (14px)</Typography>
            </Box>
            <Box>
              <Typography variant="b1">b1 - Body 1 (13px)</Typography>
            </Box>
            <Box>
              <Typography variant="b2">b2 - Body 2 (12px)</Typography>
            </Box>
            <Box>
              <Typography variant="c1">c1 - Caption 1 (11px)</Typography>
            </Box>
            <Box>
              <Typography variant="f1">f1 - Fine 1 (10px)</Typography>
            </Box>
            <Box>
              <Typography variant="f2">f2 - Fine 2 (9px)</Typography>
            </Box>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<Typography variant="t1">Title 1</Typography>
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="b1">Body 1</Typography>
<Typography variant="b2">Body 2</Typography>
<Typography variant="c1">Caption 1</Typography>
<Typography variant="f1">Fine 1</Typography>
<Typography variant="f2">Fine 2</Typography>`}
        />
      </DocSection>

      <DocSection title="Font Weights">
        <Typography variant="body2" sx={{ mb: 2 }}>
          The design-system weight scale (Inter). These names and values match the{" "}
          <code>fontWeight</code> token exported from the library and the{" "}
          <strong>Typography</strong> page.
        </Typography>
        <ExampleBox>
          <Stack spacing={1}>
            {Object.entries(fontWeight).map(([name, w]) => (
              <Typography key={name} sx={{ fontWeight: w as number }}>
                {name} ({w}) — The quick brown fox
              </Typography>
            ))}
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import { fontWeight } from '@flipspacesit/fs-ui';

<Typography sx={{ fontWeight: fontWeight.regular }}>Regular (400)</Typography>
<Typography sx={{ fontWeight: fontWeight.medium }}>Medium (500)</Typography>
<Typography sx={{ fontWeight: fontWeight.bold }}>Bold (700)</Typography>`}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mt: 2 }}
        >
          Note: the legacy <code>theme.typography.fontWeight</code> object uses
          different historical numeric mappings (e.g. <code>regular</code> = 500)
          and is deprecated — prefer the <code>fontWeight</code> token above.
        </Typography>
      </DocSection>

      <DocSection title="Responsive Typography">
        <Typography variant="body2" sx={{ mb: 2 }}>
          All typography variants include responsive font sizes that scale based
          on viewport width:
        </Typography>
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
            "& th, & td": {
              textAlign: "left",
              p: 1.5,
              borderBottom: "1px solid #E5E7EB",
            },
            "& th": {
              backgroundColor: "#F9FAFB",
              fontWeight: 600,
            },
          }}
        >
          <thead>
            <tr>
              <th>Breakpoint</th>
              <th>Min Width</th>
              <th>Scale Factor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td>-</td>
              <td>1.0x</td>
            </tr>
            <tr>
              <td>xl</td>
              <td>1536px</td>
              <td>1.05x</td>
            </tr>
            <tr>
              <td>xxl</td>
              <td>1920px</td>
              <td>1.12x</td>
            </tr>
            <tr>
              <td>xxxl</td>
              <td>2500px</td>
              <td>1.30x</td>
            </tr>
          </tbody>
        </Box>
      </DocSection>

      <DocSection title="CSS Variable: --scale">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Components use a CSS variable <code>--scale</code> for additional
          scaling control. Set this in your root CSS:
        </Typography>
        <CodeBlock
          code={`:root {
  --scale: 1;
}

/* For larger UI */
:root {
  --scale: 1.2;
}

/* For smaller UI */
:root {
  --scale: 0.9;
}`}
        />
      </DocSection>

      <DocSection title="Using Palette Colors">
        <CodeBlock
          code={`import { useTheme } from '@mui/material';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.slateBlue[50],
        color: theme.palette.black.main,
        border: \`1px solid \${theme.palette.border.main}\`,
      }}
    >
      Styled content
    </Box>
  );
}

// Or directly in sx prop
<Box
  sx={(theme) => ({
    backgroundColor: theme.palette.primaryBlue[300],
    color: theme.palette.text.primary,
  })}
/>`}
        />
      </DocSection>

      <DocSection title="Component Overrides">
        <Typography variant="body2" sx={{ mb: 2 }}>
          The theme includes default styling for common MUI components:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>
            <strong>MuiButton</strong> - Custom sizes (small/medium/large),
            shapes (square/round), and brand colors
          </li>
          <li>
            <strong>MuiTextField</strong> - Consistent border styling, disabled
            states, and size variants
          </li>
          <li>
            <strong>MuiTableContainer</strong> - Rounded borders, custom shadows
          </li>
          <li>
            <strong>MuiTableHead/MuiTableBody</strong> - Consistent cell styling
            and colors
          </li>
        </Box>
      </DocSection>
    </Box>
  );
};

export default ThemeDocs;
