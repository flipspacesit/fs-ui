import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { radii, shadows, primary } from "../../../src";

const BordersShadowsDocs: React.FC = () => (
  <Box>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
      Borders & Shadows
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Radii + elevations — Figma "Borders & Shadows" (72:277).
    </Typography>

    <Typography variant="h6" sx={{ mb: 1 }}>
      Radii
    </Typography>
    <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
      <Stack direction="row" gap={3} flexWrap="wrap">
        {Object.entries(radii).map(([name, px]) => (
          <Stack key={name} alignItems="center" gap={1} sx={{ width: 80 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                backgroundColor: primary.slateBlue[100],
                border: `1px solid ${primary.blue.primary}`,
                borderRadius: `${px}px`,
              }}
            />
            <Typography variant="b2" sx={{ textAlign: "center" }}>
              {name} · {px}px
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>

    <Typography variant="h6" sx={{ mb: 1 }}>
      Elevations
    </Typography>
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack direction="row" gap={4} flexWrap="wrap">
        {Object.entries(shadows).map(([name, val]) => (
          <Stack key={name} alignItems="center" gap={1}>
            <Box
              sx={{
                width: 96,
                height: 64,
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: val,
              }}
            />
            <Typography variant="b2">{name}</Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  </Box>
);

export default BordersShadowsDocs;
