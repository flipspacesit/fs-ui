import React from "react";
import { Box } from "@mui/material";
import { version } from "../../../package.json";
import CodeBlock from "../components/CodeBlock";
import { t, EASE } from "../docTokens";
import { counts, iconCount } from "../libStats";
import { useCopy } from "../useCopy";
import {
  Button,
  StatusChip,
  Switch,
  Checkbox,
  IconBadge,
  PriorityBadge,
  Tabs,
  Badge,
  IconButton,
  Alert,
  Gear,
  CheckCircle,
  MagnifyingGlass,
  PaperPlaneTilt,
  Info,
} from "../../../src";

interface Props {
  onNavigate?: (id: string) => void;
}

/* ------------------------------------------------------------------ atoms */

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    className="doc-mono"
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: t.accent,
      border: `1px solid ${t.border}`,
      borderRadius: "100px",
      px: "12px",
      py: "5px",
      backgroundColor: t.surface,
    }}
  >
    <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: t.signal }} />
    {children}
  </Box>
);

const CopyPill: React.FC<{ text: string }> = ({ text }) => {
  const { copied, copy } = useCopy(1500);
  return (
    <Box
      component="button"
      onClick={() => copy(text)}
      className="doc-mono"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        border: `1px solid ${t.border}`,
        borderRadius: "8px",
        backgroundColor: t.surface,
        cursor: "pointer",
        px: "14px",
        height: 44,
        fontSize: 13.5,
        color: t.text,
        transition: `border-color 150ms ${EASE}`,
        "&:hover": { borderColor: t.borderStrong },
      }}
    >
      <Box component="span" sx={{ color: t.textSubtle }}>$</Box>
      {text}
      <Box component="span" sx={{ color: copied ? t.signal : t.textSubtle, fontSize: 12, ml: "2px" }}>
        {copied ? "copied ✓" : "copy"}
      </Box>
    </Box>
  );
};

const SectionHeading: React.FC<{ kicker: string; title: string }> = ({ kicker, title }) => (
  <Box sx={{ mb: "28px" }}>
    <Box sx={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: t.accent, mb: "8px" }}>
      {kicker}
    </Box>
    <Box sx={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: t.text }}>{title}</Box>
  </Box>
);

/* --------------------------------------------------------------- gallery */

const GALLERY: { id: string; name: string; node: React.ReactNode }[] = [
  { id: "button", name: "Button", node: <Button variant="contained" size="small">Get started</Button> },
  { id: "tag", name: "StatusChip", node: <StatusChip label="Approved" status="success" size="small" /> },
  { id: "button-extras", name: "Switch", node: <Switch defaultChecked /> },
  { id: "controls", name: "Checkbox", node: <Checkbox defaultChecked color="slateBlue" /> },
  { id: "badges", name: "PriorityBadge", node: <PriorityBadge level={1} /> },
  { id: "badges", name: "IconBadge", node: <IconBadge icon={<CheckCircle />} color="success" /> },
  { id: "structure", name: "Badge", node: <Badge count={3}><IconButton icon={<Gear />} color="white" /></Badge> },
  { id: "tabs", name: "Tabs", node: <Tabs items={[{ label: "One", value: "1" }, { label: "Two", value: "2" }]} value="1" onChange={() => {}} /> },
  { id: "feedback", name: "Alert", node: <Box sx={{ transform: "scale(0.82)" }}><Alert color="success" emphasis="light" title="Saved" message="All changes stored." /></Box> },
  { id: "button-extras", name: "IconButton", node: <IconButton icon={<MagnifyingGlass />} color="yellow" /> },
];

const FEATURES: { icon: React.ReactNode; title: string; body: string }[] = [
  { icon: <Gear />, title: "Token-driven", body: "Every color, space, radius and shadow comes from the Figma design tokens." },
  { icon: <CheckCircle />, title: `${counts.Component}+ components & hooks`, body: "Buttons, inputs, tables, pins, steppers, toasts — batteries included." },
  { icon: <Info />, title: "Themed light & dark", body: "These very docs flip themes instantly via CSS custom properties." },
  { icon: <PaperPlaneTilt />, title: "TypeScript-first", body: "Full types and per-prop docs ship in the package for IntelliSense." },
  { icon: <MagnifyingGlass />, title: "Composable on MUI v7", body: "Built on Material UI so it drops into existing MUI apps cleanly." },
  { icon: <CheckCircle />, title: "Accessible & ARIA", body: "Keyboard, focus and ARIA baked into the interactive primitives." },
];

/* ------------------------------------------------------------------- page */

const GettingStarted: React.FC<Props> = ({ onNavigate }) => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <Box sx={{ pb: "24px" }}>
      {/* ---------- HERO ---------- */}
      <Box
        className="doc-dotgrid"
        sx={{
          position: "relative",
          pt: "72px",
          pb: "56px",
          borderRadius: "0 0 24px 24px",
          maskImage: "linear-gradient(to bottom, black 70%, transparent)",
        }}
      >
        <Box sx={{ display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 460px", minWidth: 0 }}>
            <Eyebrow>Flipspaces Design System · v{version}</Eyebrow>
            <Box
              sx={{
                fontSize: { xs: 40, md: 52 },
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                color: t.text,
                mt: "20px",
              }}
            >
              Build Flipspaces
              <br />
              interfaces,{" "}
              <Box component="span" sx={{ position: "relative", whiteSpace: "nowrap" }}>
                faster
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 4,
                    height: 10,
                    borderRadius: 6,
                    backgroundColor: t.signal,
                    zIndex: -1,
                    opacity: 0.85,
                  }}
                />
              </Box>
              .
            </Box>
            <Box sx={{ fontSize: 18, lineHeight: 1.6, color: t.textMuted, maxWidth: 560, mt: "20px" }}>
              A React + MUI component library with {counts.Component}+ components,{" "}
              {iconCount} icons, design tokens and hooks — the same primitives these
              docs are built with.
            </Box>
            <Box sx={{ display: "flex", gap: "12px", mt: "28px", flexWrap: "wrap", alignItems: "center" }}>
              <Button variant="contained" onClick={() => onNavigate?.("installation")}>
                Get started →
              </Button>
              <Button variant="outlined" onClick={() => scrollTo("gallery")}>
                Browse components
              </Button>
              <CopyPill text="npm i @flipspacesit/fs-ui" />
            </Box>
          </Box>

          {/* specimen collage */}
          <Box sx={{ flex: "0 1 360px", display: { xs: "none", md: "block" }, position: "relative", height: 260 }}>
            <Collage />
          </Box>
        </Box>
      </Box>

      {/* ---------- INSTALL BAND ---------- */}
      <Box sx={{ mt: "-24px", mb: "64px" }}>
        <CodeBlock
          language="bash"
          code={`# .npmrc — point the scope at GitHub Packages
@flipspacesit:registry=https://npm.pkg.github.com

# install
npm install @flipspacesit/fs-ui`}
        />
      </Box>

      {/* ---------- FEATURES ---------- */}
      <Box sx={{ mb: "72px" }}>
        <SectionHeading kicker="Why fs-ui" title="Everything you need to ship consistent UI" />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: "16px" }}>
          {FEATURES.map((f) => (
            <Box
              key={f.title}
              className="doc-chrome"
              sx={{
                p: "24px",
                borderRadius: "12px",
                backgroundColor: t.surface,
                border: `1px solid ${t.border}`,
                transition: `box-shadow 160ms ${EASE}, border-color 160ms ${EASE}`,
                "&:hover": { boxShadow: t.shadowLg, borderColor: t.borderStrong },
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: "8px", backgroundColor: t.signalTint, display: "grid", placeItems: "center", color: t.accent, mb: "16px", "& svg": { width: 20, height: 20 } }}>
                {f.icon}
              </Box>
              <Box sx={{ fontSize: 16, fontWeight: 600, color: t.text, mb: "6px" }}>{f.title}</Box>
              <Box sx={{ fontSize: 15, lineHeight: 1.6, color: t.textMuted }}>{f.body}</Box>
            </Box>
          ))}
        </Box>
        <Box className="doc-mono doc-tnum" sx={{ mt: "20px", fontSize: 13, color: t.textSubtle }}>
          {counts.Component} components · {counts.Hook} hooks · {iconCount} icons · Inter
        </Box>
      </Box>

      {/* ---------- GALLERY ---------- */}
      <Box id="gallery" sx={{ mb: "72px", scrollMarginTop: "88px" }}>
        <SectionHeading kicker="Components" title="Explore the library" />
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
          {GALLERY.map((g, i) => (
            <Box
              key={i}
              onClick={() => onNavigate?.(g.id)}
              className="doc-chrome"
              sx={{
                borderRadius: "12px",
                border: `1px solid ${t.border}`,
                backgroundColor: t.surface,
                overflow: "hidden",
                cursor: "pointer",
                transition: `box-shadow 160ms ${EASE}, transform 160ms ${EASE}`,
                "&:hover": { boxShadow: t.shadowLg, transform: "translateY(-2px)" },
                "&:hover .view": { opacity: 1 },
              }}
            >
              <Box
                className="doc-no-transition"
                sx={{
                  height: 96,
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "#ffffff",
                  backgroundImage: "radial-gradient(#e6e9f2 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                  borderBottom: `1px solid ${t.border}`,
                  overflow: "hidden",
                }}
              >
                {g.node}
              </Box>
              <Box sx={{ p: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ fontSize: 14, fontWeight: 600, color: t.text }}>{g.name}</Box>
                <Box className="view" sx={{ fontSize: 12, color: t.accent, opacity: 0, transition: "opacity 150ms" }}>
                  View →
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ---------- FOUNDATIONS ---------- */}
      <Box sx={{ mb: "64px" }}>
        <SectionHeading kicker="Foundations" title="Built on tokens" />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: "16px" }}>
          <FoundationCard title="Color" onClick={() => onNavigate?.("theme")}>
            <Box sx={{ display: "flex", gap: "6px" }}>
              {["#ffc100", "#425281", "#5970b7", "#469951", "#df2409"].map((c) => (
                <Box key={c} sx={{ width: 26, height: 26, borderRadius: "6px", backgroundColor: c }} />
              ))}
            </Box>
          </FoundationCard>
          <FoundationCard title="Type" onClick={() => onNavigate?.("typography")}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: "10px", color: t.text }}>
              <Box sx={{ fontWeight: 800, fontSize: 26 }}>Aa</Box>
              <Box sx={{ fontWeight: 600, fontSize: 20 }}>Aa</Box>
              <Box sx={{ fontWeight: 400, fontSize: 16 }}>Aa</Box>
            </Box>
          </FoundationCard>
          <FoundationCard title="Spacing" onClick={() => onNavigate?.("spacing")}>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
              {[8, 14, 20, 28].map((h) => (
                <Box key={h} sx={{ width: 10, height: h, borderRadius: "3px", backgroundColor: t.accent }} />
              ))}
            </Box>
          </FoundationCard>
          <FoundationCard title="Shadows" onClick={() => onNavigate?.("borders-shadows")}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              {[t.shadowSm, t.shadowMd, t.shadowLg].map((s, i) => (
                <Box key={i} sx={{ width: 26, height: 26, borderRadius: "6px", backgroundColor: t.surface, border: `1px solid ${t.border}`, boxShadow: s }} />
              ))}
            </Box>
          </FoundationCard>
        </Box>
      </Box>

      {/* ---------- CTA BAND ---------- */}
      <Box
        className="doc-chrome"
        sx={{
          borderRadius: "16px",
          border: `1px solid ${t.border}`,
          backgroundColor: t.surface,
          p: { xs: "28px", md: "40px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
          boxShadow: t.shadowMd,
        }}
      >
        <Box>
          <Box sx={{ fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: "-0.02em" }}>Ready to build?</Box>
          <Box sx={{ fontSize: 15, color: t.textMuted, mt: "4px" }}>Read the installation guide and drop fs-ui into your app.</Box>
        </Box>
        <Button variant="contained" onClick={() => onNavigate?.("installation")}>
          Read the guide →
        </Button>
      </Box>
    </Box>
  );
};

const FoundationCard: React.FC<{ title: string; onClick: () => void; children: React.ReactNode }> = ({
  title,
  onClick,
  children,
}) => (
  <Box
    onClick={onClick}
    className="doc-chrome"
    sx={{
      borderRadius: "12px",
      border: `1px solid ${t.border}`,
      backgroundColor: t.surface,
      p: "20px",
      cursor: "pointer",
      transition: `box-shadow 160ms ${EASE}, border-color 160ms ${EASE}`,
      "&:hover": { boxShadow: t.shadowLg, borderColor: t.borderStrong },
    }}
  >
    <Box sx={{ minHeight: 40, display: "flex", alignItems: "center" }}>{children}</Box>
    <Box sx={{ fontSize: 14, fontWeight: 600, color: t.text, mt: "16px" }}>{title}</Box>
  </Box>
);

/* specimen collage of real fs-ui components on floating cards */
const Collage: React.FC = () => {
  const card = (top: number, left: number, rot: number, child: React.ReactNode) => (
    <Box
      className="doc-no-transition"
      sx={{
        position: "absolute",
        top,
        left,
        transform: `rotate(${rot}deg)`,
        backgroundColor: "#fff",
        border: "1px solid #e6e9f2",
        borderRadius: "12px",
        boxShadow: t.shadowLg,
        p: "14px",
        display: "grid",
        placeItems: "center",
      }}
    >
      {child}
    </Box>
  );
  return (
    <>
      {card(10, 40, -4, <StatusChip label="Approved" status="success" size="small" />)}
      {card(96, 150, 3, <Button variant="contained" size="small">Publish</Button>)}
      {card(150, 10, -2, <Switch defaultChecked />)}
      {card(40, 210, 6, <PriorityBadge level={1} />)}
    </>
  );
};

export default GettingStarted;
