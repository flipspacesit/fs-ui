import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  MediaCard,
  ProductCard,
  AspectRatioBox,
  ImageThumbnailStrip,
  StatusChip,
} from "../../../src";

const sw = (hex: string) =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='51' height='38'><rect width='51' height='38' fill='${hex}'/></svg>`
  );

const CardsDocs: React.FC = () => {
  const [sel, setSel] = useState("a");

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Cards & Media
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Media and image components from Figma "Cards & Image Resolution"
        (485:429) and "Custom UI Elements" (1150:279): MediaCard, ProductCard,
        AspectRatioBox, and ImageThumbnailStrip.
      </Typography>

      <DocSection title="Import">
        <CodeBlock
          code={`import { MediaCard, ProductCard, AspectRatioBox, ImageThumbnailStrip } from '@flipspacesit/fs-ui';`}
        />
      </DocSection>

      <DocSection
        title="MediaCard"
        description="Space / media card with a status-chip and price-tag overlay on the image, plus a title and meta footer."
      >
        <ExampleBox>
          <MediaCard
            title="Living Room"
            statusChip={
              <StatusChip label="Approved" status="success" size="extraSmall" />
            }
            price="$1,200"
            meta={
              <Typography variant="f1" sx={{ color: "#616161" }}>
                3D · 360° view
              </Typography>
            }
          />
        </ExampleBox>
        <CodeBlock
          code={`<MediaCard
  title="Living Room"
  statusChip={
    <StatusChip label="Approved" status="success" size="extraSmall" />
  }
  price="$1,200"
  meta={
    <Typography variant="f1" sx={{ color: "#616161" }}>
      3D · 360° view
    </Typography>
  }
/>`}
        />
      </DocSection>

      <DocSection title="MediaCard Props">
        <PropsTable
          props={[
            {
              name: "image",
              type: "string",
              description:
                "Image URL rendered as the card's cover; the placeholder shows when omitted.",
            },
            {
              name: "title",
              type: "string",
              description:
                "Card title shown in the footer; also used as the image alt text.",
            },
            {
              name: "meta",
              type: "ReactNode",
              description:
                "Footer content rendered below the title — e.g. location or dimensions.",
            },
            {
              name: "statusChip",
              type: "ReactNode",
              description: "Overlay chip (top-left) — e.g. a StatusChip.",
            },
            {
              name: "price",
              type: "string",
              description: "Price tag (bottom-right).",
            },
            {
              name: "width",
              type: "number",
              default: "240",
              description: "Card width in pixels.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI sx overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="ProductCard"
        description="Asset / product card — elevated card with a 4:3 image, an optional download pill, and an optional right-edge icon rail."
      >
        <ExampleBox>
          <Stack direction="row" gap={3} flexWrap="wrap">
            <ProductCard
              title="Oak Table"
              subtitle="Furniture"
              onDownload={() => {}}
            />
            <ProductCard title="Walnut Chair" />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<ProductCard
  title="Oak Table"
  subtitle="Furniture"
  onDownload={() => handleDownload()}
/>

{/* Without subtitle or download pill */}
<ProductCard title="Walnut Chair" />`}
        />
      </DocSection>

      <DocSection title="ProductCard Props">
        <PropsTable
          props={[
            {
              name: "image",
              type: "string",
              description:
                "Image URL for the 4:3 cover; omit to render an empty tinted placeholder.",
            },
            {
              name: "title",
              type: "string",
              description:
                "Primary card label; also used as the image alt text.",
            },
            {
              name: "subtitle",
              type: "string",
              description:
                "Optional secondary label rendered above the title in the accent color.",
            },
            {
              name: "onDownload",
              type: "() => void",
              description:
                "Fired when the download pill is activated; the pill is hidden when unset.",
            },
            {
              name: "rail",
              type: "ReactNode",
              description:
                "Icon rail on the right edge (e.g. AR / verified badges).",
            },
            {
              name: "width",
              type: "number",
              default: "240",
              description: "Card width in pixels.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI sx overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="AspectRatioBox"
        description="Aspect-ratio image placeholder — a blue-tinted box with an image glyph; renders the image when src is set."
      >
        <ExampleBox>
          <Stack direction="row" gap={3} alignItems="flex-end">
            <AspectRatioBox ratio="1/1" label="1:1" width={120} />
            <AspectRatioBox ratio="4/3" label="4:3" width={160} />
            <AspectRatioBox ratio="16/9" label="16:9" width={200} />
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`<AspectRatioBox ratio="1/1" label="1:1" width={120} />
<AspectRatioBox ratio="4/3" label="4:3" width={160} />
<AspectRatioBox ratio="16/9" label="16:9" width={200} />`}
        />
      </DocSection>

      <DocSection title="AspectRatioBox Props">
        <PropsTable
          props={[
            {
              name: "ratio",
              type: "string",
              default: '"16/9"',
              description: 'Aspect ratio, e.g. "1/1", "4/3", "16/9".',
            },
            {
              name: "src",
              type: "string",
              description:
                "Image URL to render; when omitted, the blue placeholder glyph is shown.",
            },
            {
              name: "label",
              type: "string",
              description:
                "Caption shown under the placeholder glyph; also used as the image alt text.",
            },
            {
              name: "width",
              type: "number | string",
              default: "240",
              description:
                "Box width; number is treated as px, string passes through as a CSS length.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI sx overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        title="ImageThumbnailStrip"
        description="Selectable image thumbnail strip — a glassy group where the active tile gets a 2px border. Controlled via value / onChange."
      >
        <ExampleBox>
          <Box
            sx={{
              p: 2,
              backgroundColor: "#9fb3ed",
              borderRadius: "12px",
              width: "fit-content",
            }}
          >
            <ImageThumbnailStrip
              value={sel}
              onChange={setSel}
              items={[
                { src: sw("#425281"), value: "a" },
                { src: sw("#5970b7"), value: "b" },
                { src: sw("#738bd2"), value: "c" },
              ]}
            />
          </Box>
        </ExampleBox>
        <CodeBlock
          code={`const [sel, setSel] = useState("a");

<ImageThumbnailStrip
  value={sel}
  onChange={setSel}
  items={[
    { src: "/img/a.jpg", value: "a" },
    { src: "/img/b.jpg", value: "b" },
    { src: "/img/c.jpg", value: "c" },
  ]}
/>`}
        />
      </DocSection>

      <DocSection title="ImageThumbnailStrip Props">
        <PropsTable
          props={[
            {
              name: "items",
              type: "ThumbItem[]",
              description: "Thumbnails to render, in order.",
            },
            {
              name: "value",
              type: "string",
              description:
                "Currently selected ThumbItem.value; the matching tile shows the active border.",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              description:
                "Fired with the clicked tile's value when selection changes.",
            },
            {
              name: "variant",
              type: '"light" | "dark"',
              default: '"light"',
              description: "Light (white glass) or dark (black glass) group.",
            },
            {
              name: "sx",
              type: "SxProps<Theme>",
              description: "MUI sx overrides, merged last.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="ThumbItem">
        <PropsTable
          props={[
            {
              name: "src",
              type: "string",
              description: "Image URL rendered as the thumbnail.",
            },
            {
              name: "value",
              type: "string",
              description:
                "Value emitted via onChange and matched against value for active state.",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default CardsDocs;
