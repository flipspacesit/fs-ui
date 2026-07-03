import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import { DocSection, ExampleBox } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { HEIGHTS, FontSizeMap, ButtonBorderRadiusMap, Colors } from "../../../src";

const ConstantsDocs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Constants
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Shared constants for consistent sizing, typography, and styling across
        components.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { 
  HEIGHTS, 
  FontSizeMap, 
  ButtonBorderRadiusMap, 
  Colors,
  ComponentSize,
  ComponentVariant
} from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="HEIGHTS" description="Height values for different component sizes">
        <ExampleBox>
          <Stack spacing={2}>
            {Object.entries(HEIGHTS).map(([key, value]) => (
              <Stack key={key} direction="row" alignItems="center" spacing={2}>
                <Typography sx={{ width: 100, fontWeight: 500 }}>{key}:</Typography>
                <Box
                  sx={{
                    height: value,
                    width: 200,
                    backgroundColor: "#DEE7FF",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="caption">{value}</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const HEIGHTS = {
  extraSmall: "20px",
  small: "24px",
  medium: "28px",
  large: "32px",
  extraLarge: "48px",
};

// Usage with CSS variable for scaling
height: \`calc(\${HEIGHTS[size]} * var(--scale, 1))\``}
        />
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
          <code>ComponentSize</code> (extraSmall → extraLarge) is the canonical
          size scale. The step is +4px through <code>large</code> (32px);{" "}
          <code>extraLarge</code> jumps to 48px as a touch-target size. Not every
          component exposes all five steps — each accepts the subset its design
          defines.
        </Typography>
      </DocSection>

      <DocSection
        title="FontSizeMap"
        description="Maps component sizes to MUI Typography variants"
      >
        <ExampleBox>
          <Stack spacing={1}>
            {Object.entries(FontSizeMap).map(([key, value]) => (
              <Stack key={key} direction="row" alignItems="center" spacing={2}>
                <Typography sx={{ width: 100, fontWeight: 500 }}>{key}:</Typography>
                <Typography variant="body2">"{value}"</Typography>
              </Stack>
            ))}
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const FontSizeMap = {
  extraSmall: "c1", // 11px
  small: "b2",      // 12px
  medium: "b1",     // 13px
  large: "h4",      // 14px
  extraLarge: "h4", // 14px
};

// Usage
<Typography variant={FontSizeMap[size]}>Text</Typography>`}
        />
      </DocSection>

      <DocSection
        title="ButtonBorderRadiusMap"
        description="Border radius values for button variants"
      >
        <ExampleBox>
          <Stack spacing={3}>
            {Object.entries(ButtonBorderRadiusMap).map(([variant, sizes]) => (
              <Box key={variant}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  {variant}
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {Object.entries(sizes).map(([size, radius]) => (
                    <Paper
                      key={size}
                      variant="outlined"
                      sx={{
                        p: 2,
                        minWidth: 100,
                        textAlign: "center",
                        borderRadius: radius,
                      }}
                    >
                      <Typography variant="caption" display="block">
                        {size}
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {radius}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`const ButtonBorderRadiusMap = {
  rectangular: {
    extraSmall: "4px",
    small: "8px",
    medium: "8px",
    large: "8px",
    extraLarge: "8px",
  },
  round: {
    extraSmall: "100px",
    small: "100px",
    medium: "100px",
    large: "100px",
    extraLarge: "100px",
  },
};

// Usage
borderRadius: ButtonBorderRadiusMap[variant][size]`}
        />
      </DocSection>

      <DocSection title="Colors" description="Common color tokens">
        <ExampleBox>
          <Stack spacing={3}>
            {Object.entries(Colors).map(([category, colors]) => (
              <Box key={category}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 600, textTransform: "capitalize" }}
                >
                  {category}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {Object.entries(colors).map(([name, value]) => (
                    <Paper
                      key={name}
                      variant="outlined"
                      sx={{
                        p: 1,
                        minWidth: 80,
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: value,
                          borderRadius: 1,
                          mx: "auto",
                          mb: 1,
                          border: "1px solid #E5E7EB",
                        }}
                      />
                      <Typography variant="caption" display="block">
                        {name}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        {value}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`// @deprecated — derived from the DS token layer (theme.palette / tokens).
// Prefer the theme palette; kept for backward compatibility.
const Colors = {
  primary: {
    main: "#3659db",  // semantic.interactive.primary
    light: "#c5d2ff", // interactive[200]
    dark: "#344168",  // slateBlue.primaryDark
  },
  border: {
    light: "#aeb6ce", // softSteel[400]
    medium: "#a5bad5", // slateBlue[300]
    dark: "#212529",  // neutral.black
  },
  background: {
    white: "#ffffff",
    selected: "#e2ebf7", // slateBlue[100]
    hover: "#f1f7ff",    // slateBlue[50]
  },
  text: {
    primary: "#1B1C1E",
    secondary: "#616161", // grey[400]
    disabled: "#919191",  // grey[300]
  },
  status: {
    success: "#469951", // semantic.success.primary
    warning: "#f59e0b", // semantic.warning.primary
    error: "#df2409",   // semantic.error.primary
    info: "#3659db",    // semantic.interactive.primary
  },
};`}
        />
      </DocSection>

      <DocSection title="TypeScript Types">
        <CodeBlock
          code={`// Component size type
type ComponentSize = "extraSmall" | "small" | "medium" | "large" | "extraLarge";

// Component variant type
type ComponentVariant = "round" | "rectangular";

// Usage in your components
import { ComponentSize, ComponentVariant } from '@flipspacesit/fs-ui';

interface MyComponentProps {
  size?: ComponentSize;
  variant?: ComponentVariant;
}`}
        />
      </DocSection>

      <DocSection title="CSS Variable: --scale">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Components use a CSS variable <code>--scale</code> for responsive
          scaling. Set this in your root CSS:
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
    </Box>
  );
};

export default ConstantsDocs;
