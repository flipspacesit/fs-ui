import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { NoDataContent, Info } from "../../../src";

const NoDataContentDocs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        NoDataContent
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        An empty state component that displays a "no data" placeholder with an
        icon, title, description, and subtitle. Useful for tables, lists, and
        search results with no matching data.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { NoDataContent } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <Paper variant="outlined" sx={{ minHeight: 300, position: "relative" }}>
            <NoDataContent entityName="Orders" />
          </Paper>
        </ExampleBox>
        <CodeBlock
          code={`<NoDataContent entityName="Orders" />`}
        />
      </DocSection>

      <DocSection title="Custom Title & Subtitle">
        <ExampleBox>
          <Paper variant="outlined" sx={{ minHeight: 300, position: "relative" }}>
            <NoDataContent
              entityName="Invoices"
              title="No invoices yet"
              subtitle="Create your first invoice to get started."
            />
          </Paper>
        </ExampleBox>
        <CodeBlock
          code={`<NoDataContent
  entityName="Invoices"
  title="No invoices yet"
  subtitle="Create your first invoice to get started."
/>`}
        />
      </DocSection>

      <DocSection title="With Description">
        <ExampleBox>
          <Paper variant="outlined" sx={{ minHeight: 300, position: "relative" }}>
            <NoDataContent
              entityName="GRNs"
              description="Try adjusting your search or filter criteria."
              subtitle="No data available."
            />
          </Paper>
        </ExampleBox>
        <CodeBlock
          code={`<NoDataContent
  entityName="GRNs"
  description="Try adjusting your search or filter criteria."
  subtitle="No data available."
/>`}
        />
      </DocSection>

      <DocSection title="Custom Icon">
        <ExampleBox>
          <Paper variant="outlined" sx={{ minHeight: 300, position: "relative" }}>
            <NoDataContent
              entityName="Notifications"
              icon={<Info size={64} fill="#3361FF" />}
              title="All caught up!"
              subtitle="No new notifications."
            />
          </Paper>
        </ExampleBox>
        <CodeBlock
          code={`import { Info } from '@flipspacesit/fs-ui';

<NoDataContent
  entityName="Notifications"
  icon={<Info size={64} fill="#3361FF" />}
  title="All caught up!"
  subtitle="No new notifications."
/>`}
        />
      </DocSection>

      <DocSection title="Compact Mode">
        <ExampleBox>
          <Stack spacing={2}>
            <Typography variant="body2">
              Compact mode removes vertical padding for inline or tight layouts:
            </Typography>
            <Paper
              variant="outlined"
              sx={{ minHeight: 150, position: "relative" }}
            >
              <NoDataContent
                entityName="Results"
                compact
                subtitle="No results to display."
              />
            </Paper>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<NoDataContent entityName="Results" compact subtitle="No results to display." />`}
        />
      </DocSection>

      <DocSection title="Hidden Title">
        <ExampleBox>
          <Paper variant="outlined" sx={{ minHeight: 250, position: "relative" }}>
            <NoDataContent
              entityName="Items"
              hideTitle
              subtitle="Nothing here yet."
            />
          </Paper>
        </ExampleBox>
        <CodeBlock
          code={`<NoDataContent entityName="Items" hideTitle subtitle="Nothing here yet." />`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "entityName",
              type: "string",
              description:
                'The name of the entity (used in default title: "No matching {entityName} found")',
            },
            {
              name: "title",
              type: "string",
              description:
                'Custom title text (overrides the default "No matching {entityName} found")',
            },
            {
              name: "subtitle",
              type: "string",
              default: '"No data available."',
              description: "Subtitle text shown below the title/description",
            },
            {
              name: "description",
              type: "string",
              description:
                "Additional description text between the title and subtitle",
            },
            {
              name: "icon",
              type: "React.ReactNode",
              default: "<NoDataIcon />",
              description:
                "Custom icon to display instead of the default NoDataIcon",
            },
            {
              name: "hideTitle",
              type: "boolean",
              default: "false",
              description: "Hide the title text completely",
            },
            {
              name: "compact",
              type: "boolean",
              default: "false",
              description:
                "Remove vertical padding for compact/inline display",
            },
            {
              name: "containerSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the outer container",
            },
            {
              name: "iconWrapperSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the icon wrapper",
            },
            {
              name: "titleSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the title text",
            },
            {
              name: "descriptionSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the description text",
            },
            {
              name: "subtitleSx",
              type: "SxProps<Theme>",
              description: "Custom styles for the subtitle text",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default NoDataContentDocs;
