import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface DocSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const DocSection: React.FC<DocSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      {children}
    </Box>
  );
};

interface ExampleBoxProps {
  children: React.ReactNode;
}

export const ExampleBox: React.FC<ExampleBoxProps> = ({ children }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {children}
    </Paper>
  );
};

interface PropsTableProps {
  props: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  return (
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
        "& code": {
          backgroundColor: "#F3F4F6",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontSize: 12,
        },
      }}
    >
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name}>
            <td>
              <code>{prop.name}</code>
            </td>
            <td>
              <code>{prop.type}</code>
            </td>
            <td>{prop.default ? <code>{prop.default}</code> : "-"}</td>
            <td>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </Box>
  );
};

export default DocSection;
