import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { radii, shadows, primary } from "../../../src";

const ShadowSwatch: React.FC<{ name: string; value: string }> = ({
  name,
  value,
}) => (
  <Stack alignItems="center" gap={1}>
    <Box
      sx={{
        width: 96,
        height: 64,
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: value,
      }}
    />
    <Typography variant="b2">{name}</Typography>
  </Stack>
);

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
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      <code>e1</code>–<code>e6</code> are the elevation scale from the specimen.
    </Typography>
    <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
      <Stack direction="row" gap={4} flexWrap="wrap">
        {Object.entries(shadows)
          .filter(([name]) => name !== "elevation03")
          .map(([name, val]) => (
            <ShadowSwatch key={name} name={name} value={val} />
          ))}
      </Stack>
    </Paper>

    <Typography variant="h6" sx={{ mb: 1 }}>
      Named shadow
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      <code>elevation03</code> is a separately-bound DS variable (
      <code>Shadows/Grey/Elevation&nbsp;03</code>) — the subtle card / input-hover
      shadow used across fs-ui components. It sits outside the <code>e1</code>–
      <code>e6</code> scale by design.
    </Typography>
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack direction="row" gap={4} flexWrap="wrap">
        <ShadowSwatch name="elevation03" value={shadows.elevation03} />
      </Stack>
    </Paper>
  </Box>
);

export default BordersShadowsDocs;
