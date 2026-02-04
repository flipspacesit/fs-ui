import React from "react";
import { Box, Typography } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledHeaderCell,
  StyledTableRow,
  StyledTableCell,
} from "../../../src";

const TableDocs: React.FC = () => {
  const sampleData = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Inactive" },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Table Components
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Pre-styled table components for consistent data display across the
        application.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledHeaderCell,
  StyledTableRow,
  StyledTableCell,
} from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection title="Basic Usage">
        <ExampleBox>
          <StyledTableContainer>
            <StyledTable>
              <StyledTableHead>
                <StyledTableRow>
                  <StyledHeaderCell>ID</StyledHeaderCell>
                  <StyledHeaderCell>Name</StyledHeaderCell>
                  <StyledHeaderCell>Email</StyledHeaderCell>
                  <StyledHeaderCell>Status</StyledHeaderCell>
                </StyledTableRow>
              </StyledTableHead>
              <StyledTableBody>
                {sampleData.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </StyledTableBody>
            </StyledTable>
          </StyledTableContainer>
        </ExampleBox>
        <CodeBlock
          code={`<StyledTableContainer>
  <StyledTable>
    <StyledTableHead>
      <StyledTableRow>
        <StyledHeaderCell>ID</StyledHeaderCell>
        <StyledHeaderCell>Name</StyledHeaderCell>
        <StyledHeaderCell>Email</StyledHeaderCell>
        <StyledHeaderCell>Status</StyledHeaderCell>
      </StyledTableRow>
    </StyledTableHead>
    <StyledTableBody>
      {data.map((row) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell>{row.id}</StyledTableCell>
          <StyledTableCell>{row.name}</StyledTableCell>
          <StyledTableCell>{row.email}</StyledTableCell>
          <StyledTableCell>{row.status}</StyledTableCell>
        </StyledTableRow>
      ))}
    </StyledTableBody>
  </StyledTable>
</StyledTableContainer>`}
        />
      </DocSection>

      <DocSection title="Available Components">
        <PropsTable
          props={[
            {
              name: "StyledTableContainer",
              type: "styled(TableContainer)",
              description:
                "Container with rounded borders and custom scrollbar styling",
            },
            {
              name: "StyledTable",
              type: "styled(Table)",
              description: "Table with minimum width for responsiveness",
            },
            {
              name: "StyledTableHead",
              type: "styled(TableHead)",
              description: "Table header with background color",
            },
            {
              name: "StyledTableBody",
              type: "styled(TableBody)",
              description: "Standard table body",
            },
            {
              name: "StyledHeaderCell",
              type: "styled(TableCell)",
              description: "Header cell with bold text and consistent padding",
            },
            {
              name: "StyledTableRow",
              type: "styled(TableRow)",
              description: "Row with hover effect",
            },
            {
              name: "StyledTableCell",
              type: "styled(TableCell)",
              description: "Data cell with consistent padding and borders",
            },
            {
              name: "StyledSpacerRow",
              type: "styled(TableRow)",
              description: "Empty row for visual separation",
            },
            {
              name: "StyledSpacerCell",
              type: "styled(TableCell)",
              description: "Empty cell for spacer rows",
            },
            {
              name: "StyledTableWrapper",
              type: "styled(Box)",
              description: "Wrapper with overflow handling",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Styling Details">
        <Typography variant="body2" sx={{ mb: 2 }}>
          The styled components include:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>Rounded corners on the container (8px)</li>
          <li>Subtle border (0.5px solid #AEB6CE)</li>
          <li>Header background color (#F0F4FF)</li>
          <li>Row hover effect (#F9FAFB)</li>
          <li>Custom scrollbar styling</li>
          <li>Consistent padding (12px 16px)</li>
        </Box>
      </DocSection>

      <DocSection title="Using with MUI Table Components">
        <Typography variant="body2" sx={{ mb: 2 }}>
          The library also re-exports standard MUI table components for
          convenience:
        </Typography>
        <CodeBlock
          code={`import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@flipspacesit/fs-ui';`}
        />
      </DocSection>
    </Box>
  );
};

export default TableDocs;
