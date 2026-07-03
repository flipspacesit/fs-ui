import React from "react";
import { Box } from "@mui/material";
import { t, EASE } from "../docTokens";
import { GROUPED, chapterNo } from "./nav";

interface Props {
  activePage: string;
  onNavigate: (id: string) => void;
}

export const SidebarContent: React.FC<Props> = ({ activePage, onNavigate }) => {
  return (
    <Box sx={{ px: "20px", pb: "24px" }}>
      {GROUPED.map(({ category, items }) => (
        <Box key={category} sx={{ mb: "8px" }}>
          {/* chapter header */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              pt: "20px",
              pb: "8px",
              backgroundColor: t.bg,
            }}
          >
            <Box
              className="doc-mono"
              sx={{
                fontSize: 10,
                fontWeight: 700,
                color: t.textSubtle,
                backgroundColor: t.signalTint,
                borderRadius: "6px",
                px: "5px",
                py: "1px",
              }}
            >
              {chapterNo(category)}
            </Box>
            <Box sx={{ flex: 1, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: t.textSubtle }}>
              {category}
            </Box>
            <Box className="doc-tnum" sx={{ fontSize: 10, fontWeight: 700, color: t.textSubtle }}>
              {items.length}
            </Box>
          </Box>

          {/* items */}
          {items.map((item) => {
            const active = item.id === activePage;
            return (
              <Box
                key={item.id}
                component="button"
                onClick={() => onNavigate(item.id)}
                title={item.label}
                sx={{
                  position: "relative",
                  textAlign: "left",
                  border: "none",
                  cursor: "pointer",
                  height: 36,
                  ml: "12px",
                  width: "calc(100% - 12px)",
                  px: "10px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? t.text : t.textMuted,
                  backgroundColor: active ? t.accentTint : "transparent",
                  transition: `background-color 150ms ${EASE}, color 150ms ${EASE}`,
                  "&:hover": { backgroundColor: active ? t.accentTint : t.sunken, color: t.text },
                }}
              >
                {active && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: -12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: 16,
                      borderRadius: 3,
                      backgroundColor: t.signal,
                    }}
                  />
                )}
                <Box sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.label}
                </Box>
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default SidebarContent;
