import React from "react";
import { Box, Typography, Stack, Paper, useTheme } from "@mui/material";
import { DocSection, ExampleBox } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";

const ColorSwatch: React.FC<{ name: string; color: string; textColor?: string }> = ({
  name,
  color,
  textColor = "#1B1C1E",
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
  </Paper>
);

const ThemeDocs: React.FC = () => {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const palette = theme.palette as any;

  const colorGroups = [
    {
      name: "Primary & Brand",
      colors: [
        { name: "primary", color: palette.primary?.main },
        { name: "secondary", color: palette.secondary?.main },
        { name: "yellow", color: palette.yellow?.main },
      ],
    },
    {
      name: "Blue",
      colors: [
        { name: "50", color: palette.blue?.[50] },
        { name: "200", color: palette.blue?.[200] },
        { name: "300", color: palette.blue?.[300] },
        { name: "main", color: palette.blue?.main },
        { name: "700", color: palette.blue?.[700] },
      ],
    },
    {
      name: "Purple",
      colors: [
        { name: "50", color: palette.purple?.[50] },
        { name: "100", color: palette.purple?.[100] },
        { name: "200", color: palette.purple?.[200] },
        { name: "400", color: palette.purple?.[400] },
        { name: "600", color: palette.purple?.[600] },
        { name: "800", color: palette.purple?.[800] },
      ],
    },
    {
      name: "Green",
      colors: [
        { name: "50", color: palette.green?.[50] },
        { name: "200", color: palette.green?.[200] },
        { name: "400", color: palette.green?.[400] },
        { name: "main", color: palette.green?.main },
        { name: "800", color: palette.green?.[800] },
      ],
    },
    {
      name: "Orange",
      colors: [
        { name: "50", color: palette.orange?.[50] },
        { name: "200", color: palette.orange?.[200] },
        { name: "400", color: palette.orange?.[400] },
        { name: "main", color: palette.orange?.main },
        { name: "800", color: palette.orange?.[800] },
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
      ],
    },
    {
      name: "Utility",
      colors: [
        { name: "white", color: palette.white?.main },
        { name: "black", color: palette.black?.main },
        { name: "border", color: palette.border?.main },
        { name: "softSteel", color: palette.softSteel?.main },
        { name: "surface", color: palette.surface?.main },
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
              sx={{ fontWeight: 600, mb: 1, textTransform: "capitalize" }}
            >
              {group.name}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {group.colors
                .filter((c) => c.color)
                .map((c) => (
                  <ColorSwatch key={c.name} name={c.name} color={c.color} />
                ))}
            </Stack>
          </Box>
        ))}
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
        <ExampleBox>
          <Stack spacing={1}>
            <Typography sx={{ fontWeight: 300 }}>
              small (300) - Light text
            </Typography>
            <Typography sx={{ fontWeight: 400 }}>
              light (400) - Regular text
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              regular (500) - Medium text
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
              medium (600) - Semi-bold text
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>
              bold (700) - Bold text
            </Typography>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`// Access font weights from theme
const theme = useTheme();

<Typography sx={{ fontWeight: theme.typography.fontWeight.small }}>
  Light (300)
</Typography>
<Typography sx={{ fontWeight: theme.typography.fontWeight.regular }}>
  Regular (500)
</Typography>
<Typography sx={{ fontWeight: theme.typography.fontWeight.bold }}>
  Bold (700)
</Typography>`}
        />
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
        backgroundColor: theme.palette.purple[50],
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
    backgroundColor: theme.palette.blue[200],
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
