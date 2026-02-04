import React from "react";
import { Box, Typography } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { EllipsisTooltip } from "../../../src";

const EllipsisTooltipDocs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        EllipsisTooltip
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A text component that automatically shows a tooltip when the content is
        truncated due to overflow.
      </Typography>

      <DocSection title="Import">
        <CodeBlock code={`import { EllipsisTooltip } from '@flipspacesit/fs-ui';`} />
      </DocSection>

      <DocSection
        title="Basic Usage"
        description="Hover over the truncated text to see the full content"
      >
        <ExampleBox>
          <Box sx={{ width: 200 }}>
            <EllipsisTooltip>
              This is a very long text that will be truncated and show a tooltip
              when hovered.
            </EllipsisTooltip>
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<Box sx={{ width: 200 }}>
  <EllipsisTooltip>
    This is a very long text that will be truncated and show a tooltip
    when hovered.
  </EllipsisTooltip>
</Box>`}
        />
      </DocSection>

      <DocSection
        title="No Tooltip When Not Truncated"
        description="Tooltip only appears when text is actually truncated"
      >
        <ExampleBox>
          <Box sx={{ width: 300 }}>
            <EllipsisTooltip>Short text (no tooltip)</EllipsisTooltip>
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<Box sx={{ width: 300 }}>
  <EllipsisTooltip>Short text (no tooltip)</EllipsisTooltip>
</Box>`}
        />
      </DocSection>

      <DocSection title="Custom Max Width">
        <ExampleBox>
          <EllipsisTooltip maxWidth={150}>
            This text has a custom max width of 150px applied directly.
          </EllipsisTooltip>
        </ExampleBox>
        <CodeBlock
          code={`<EllipsisTooltip maxWidth={150}>
  This text has a custom max width of 150px applied directly.
</EllipsisTooltip>`}
        />
      </DocSection>

      <DocSection title="Tooltip Placement">
        <ExampleBox>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Box sx={{ width: 150 }}>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                Top (default):
              </Typography>
              <EllipsisTooltip placement="top">
                Long text with top placement tooltip
              </EllipsisTooltip>
            </Box>
            <Box sx={{ width: 150 }}>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                Bottom:
              </Typography>
              <EllipsisTooltip placement="bottom">
                Long text with bottom placement tooltip
              </EllipsisTooltip>
            </Box>
            <Box sx={{ width: 150 }}>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                Left:
              </Typography>
              <EllipsisTooltip placement="left">
                Long text with left placement tooltip
              </EllipsisTooltip>
            </Box>
            <Box sx={{ width: 150 }}>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                Right:
              </Typography>
              <EllipsisTooltip placement="right">
                Long text with right placement tooltip
              </EllipsisTooltip>
            </Box>
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<EllipsisTooltip placement="top">Top tooltip</EllipsisTooltip>
<EllipsisTooltip placement="bottom">Bottom tooltip</EllipsisTooltip>
<EllipsisTooltip placement="left">Left tooltip</EllipsisTooltip>
<EllipsisTooltip placement="right">Right tooltip</EllipsisTooltip>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Content to display (will be truncated if it overflows)",
            },
            {
              name: "placement",
              type: "TooltipProps['placement']",
              default: '"top-start"',
              description: "Tooltip placement position",
            },
            {
              name: "maxWidth",
              type: "string | number",
              default: '"100%"',
              description: "Maximum width of the text container",
            },
            {
              name: "style",
              type: "CSSProperties",
              description: "Custom styles for the span wrapper",
            },
            {
              name: "tooltipVariant",
              type: "Typography variant",
              default: '"body2"',
              description: "Typography variant for tooltip content",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default EllipsisTooltipDocs;
