import React from "react";
import { Box } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import SettingsBrightnessRoundedIcon from "@mui/icons-material/SettingsBrightnessRounded";
import { useThemeMode, type ThemeChoice } from "../ThemeMode";
import { t } from "../docTokens";

const OPTIONS: { value: ThemeChoice; icon: React.ReactNode; label: string }[] = [
  { value: "light", icon: <LightModeRoundedIcon sx={{ fontSize: 16 }} />, label: "Light" },
  { value: "system", icon: <SettingsBrightnessRoundedIcon sx={{ fontSize: 16 }} />, label: "System" },
  { value: "dark", icon: <DarkModeRoundedIcon sx={{ fontSize: 16 }} />, label: "Dark" },
];

export const ThemeToggle: React.FC = () => {
  const { choice, setChoice } = useThemeMode();
  return (
    <Box
      role="group"
      aria-label="Theme"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
        p: "2px",
        borderRadius: "8px",
        backgroundColor: t.sunken,
        border: `1px solid ${t.border}`,
      }}
    >
      {OPTIONS.map((o) => {
        const active = choice === o.value;
        return (
          <Box
            key={o.value}
            component="button"
            aria-pressed={active}
            aria-label={o.label}
            title={o.label}
            onClick={() => setChoice(o.value)}
            sx={{
              width: 30,
              height: 26,
              display: "grid",
              placeItems: "center",
              border: "none",
              cursor: "pointer",
              borderRadius: "6px",
              backgroundColor: active ? t.surface : "transparent",
              color: active ? t.text : t.textSubtle,
              boxShadow: active ? t.shadowSm : "none",
              transition: "color 150ms, background-color 150ms",
              "&:hover": { color: t.text },
            }}
          >
            {o.icon}
          </Box>
        );
      })}
    </Box>
  );
};

export default ThemeToggle;
