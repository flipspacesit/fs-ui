import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { spacing, grid, breakpoints } from "../../../src";

const SpacingDocs: React.FC = () => (
  <Box>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
      Spacing & Grid
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      4px base scale + 12-column responsive grid — Figma "Grids and Column
      Setup" (72:6).
    </Typography>

    <Typography variant="h6" sx={{ mb: 1 }}>
      Spacing scale (base 4px)
    </Typography>
    <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
      <Stack gap={1.5}>
        {Object.entries(spacing).map(([step, px]) => (
          <Stack key={step} direction="row" alignItems="center" gap={3}>
            <Box sx={{ width: 110, flexShrink: 0, color: "text.secondary" }}>
              <Typography variant="b2">
                space-{step} · {px}px
              </Typography>
            </Box>
            <Box
              sx={{
                width: `${px}px`,
                height: 16,
                backgroundColor: "primaryBlue.main",
                borderRadius: "2px",
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Paper>

    <Typography variant="h6" sx={{ mb: 1 }}>
      Grid — {grid.columns} columns (per breakpoint)
    </Typography>
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack gap={1}>
        <Typography variant="b2" sx={{ color: "text.secondary" }}>
          Default gutter {grid.gutter}px · margin {grid.margin}px
        </Typography>
        {Object.entries(grid.responsive).map(([bp, cfg]) => (
          <Typography key={bp} variant="b1">
            {bp}px — gutter {cfg.gutter}px, margin {cfg.margin}px
          </Typography>
        ))}
        <Typography variant="b2" sx={{ mt: 1, color: "text.secondary" }}>
          Breakpoints: {Object.entries(breakpoints)
            .map(([k, v]) => `${k} ${v}`)
            .join(" · ")}
        </Typography>
      </Stack>
    </Paper>
  </Box>
);

export default SpacingDocs;
