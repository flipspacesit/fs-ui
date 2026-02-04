import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import { TableSkeletonLoader } from "../../../src/components/TableSkeletonLoader";

const TableSkeletonDocs: React.FC = () => {
  const basicColumns = [
    { title: "Name", style: { width: "200px" } },
    { title: "Email", style: { width: "250px" } },
    { title: "Role", style: { width: "150px" } },
    { title: "Status", style: { width: "100px" } },
    { title: "Actions", style: { width: "100px" } },
  ];

  const productColumns = [
    { title: "Product", style: { width: "250px" } },
    { title: "SKU", style: { width: "120px" } },
    { title: "Category", style: { width: "150px" } },
    { title: "Price", style: { width: "100px" } },
    { title: "Stock", style: { width: "80px" } },
    { title: "Actions", style: { width: "100px" } },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        TableSkeletonLoader
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A skeleton loading state for tables that displays while data is being
        fetched. Shows animated placeholder rows matching your table structure.
      </Typography>

      <DocSection
        title="Basic Usage"
        description="A simple table skeleton with column headers."
      >
        <ExampleBox>
          <Box sx={{ height: 400, overflow: "hidden" }}>
            <TableSkeletonLoader
              columns={basicColumns}
              hideCount
              height="350px"
              minWidth="800px"
              rowCount={5}
            />
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`import { TableSkeletonLoader } from '@flipspacesit/fs-ui';

const columns = [
  { title: 'Name', style: { width: '200px' } },
  { title: 'Email', style: { width: '250px' } },
  { title: 'Role', style: { width: '150px' } },
  { title: 'Status', style: { width: '100px' } },
  { title: 'Actions', style: { width: '100px' } },
];

<TableSkeletonLoader
  columns={columns}
  rowCount={5}
/>`}
        />
      </DocSection>

      <DocSection
        title="Custom Styling"
        description="Customize the appearance with different colors and dimensions."
      >
        <ExampleBox>
          <Box sx={{ height: 350, overflow: "hidden" }}>
            <TableSkeletonLoader
              columns={productColumns}
              hideCount
              height="300px"
              minWidth="850px"
              rowCount={4}
              headerBgColor="#3361FF"
            />
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`<TableSkeletonLoader
  columns={productColumns}
  rowCount={4}
  headerBgColor="#3361FF"
  height="300px"
/>`}
        />
      </DocSection>

      <DocSection
        title="Usage Pattern"
        description="Common pattern for loading states in data tables."
      >
        <CodeBlock
          code={`import { TableSkeletonLoader, StyledTable } from '@flipspacesit/fs-ui';

const UserTable = () => {
  const { data, isLoading } = useUsers();

  const columns = [
    { title: 'Name', style: { width: '200px' } },
    { title: 'Email', style: { width: '250px' } },
    { title: 'Role', style: { width: '150px' } },
  ];

  if (isLoading) {
    return <TableSkeletonLoader columns={columns} rowCount={10} />;
  }

  return (
    <StyledTable>
      {/* Actual table content */}
    </StyledTable>
  );
};`}
        />
      </DocSection>

      <DocSection
        title="Different Row Counts"
        description="Adjust the number of skeleton rows based on expected data."
      >
        <ExampleBox>
          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
                3 rows (small list):
              </Typography>
              <Box sx={{ height: 200, overflow: "hidden" }}>
                <TableSkeletonLoader
                  columns={[
                    { title: "Item" },
                    { title: "Value" },
                    { title: "Actions" },
                  ]}
                  hideCount
                  height="180px"
                  minWidth="400px"
                  rowCount={3}
                />
              </Box>
            </Box>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`// Small list
<TableSkeletonLoader columns={columns} rowCount={3} />

// Default (9 rows)
<TableSkeletonLoader columns={columns} />

// Large list
<TableSkeletonLoader columns={columns} rowCount={15} />`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          props={[
            {
              name: "columns",
              type: "TableSkeletonColumn[]",
              default: "-",
              description:
                "Column definitions with title/value and optional styles",
            },
            {
              name: "hideCount",
              type: "boolean",
              default: "false",
              description: "Hide the top margin (count area)",
            },
            {
              name: "width",
              type: "string",
              default: '"100%"',
              description: "Container width",
            },
            {
              name: "height",
              type: "string",
              default: '"calc(100vh - 242px)"',
              description: "Container height",
            },
            {
              name: "rowCount",
              type: "number",
              default: "9",
              description: "Number of skeleton rows to display",
            },
            {
              name: "minWidth",
              type: "string",
              default: '"1165px"',
              description: "Minimum width of the table",
            },
            {
              name: "headerBgColor",
              type: "string",
              default: '"#425281"',
              description: "Background color for table header",
            },
          ]}
        />
      </DocSection>

      <DocSection title="TableSkeletonColumn Type">
        <CodeBlock
          code={`interface TableSkeletonColumn {
  /** Column header title */
  title?: string;
  /** Alternative value for header */
  value?: string;
  /** Custom styles for the column */
  style?: React.CSSProperties;
}`}
        />
      </DocSection>
    </Box>
  );
};

export default TableSkeletonDocs;
