import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { fontSize, fontWeight, fontFamily } from "../../../src";

const SIZES: [string, number][] = [
  ["h1", fontSize.h1],
  ["h2", fontSize.h2],
  ["h3", fontSize.h3],
  ["h4", fontSize.h4],
  ["b1", fontSize.b1],
  ["b2", fontSize.b2],
  ["c1", fontSize.c1],
  ["f1", fontSize.f1],
];

const TypographyDocs: React.FC = () => (
  <Box>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
      Typography
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Font family {fontFamily} — Figma "Typography Variants" (72:5).
    </Typography>

    <Typography variant="h6" sx={{ mb: 1 }}>
      Type scale
    </Typography>
    <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
      <Stack gap={2}>
        {SIZES.map(([name, size]) => (
          <Stack key={name} direction="row" alignItems="baseline" gap={3}>
            <Box sx={{ width: 80, flexShrink: 0, color: "text.secondary" }}>
              <Typography variant="b2">
                {name} · {size}px
              </Typography>
            </Box>
            <Typography sx={{ fontFamily, fontSize: `${size}px`, fontWeight: 600 }}>
              The quick brown fox
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>

    <Typography variant="h6" sx={{ mb: 1 }}>
      Weights
    </Typography>
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack gap={1.5}>
        {Object.entries(fontWeight).map(([name, w]) => (
          <Typography key={name} sx={{ fontFamily, fontSize: 16, fontWeight: w }}>
            {name} ({w}) — The quick brown fox jumps over the lazy dog
          </Typography>
        ))}
      </Stack>
    </Paper>
  </Box>
);

export default TypographyDocs;
