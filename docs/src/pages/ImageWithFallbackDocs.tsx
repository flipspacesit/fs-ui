import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  ImageWithFallback,
  ImageWithFallbackComponent,
} from "../../../src/components/ImageWithFallback";
import { UserCircle } from "../../../src/icons/UserCircle";

const PlaceholderIcon: React.FC = () => (
  <Box
    sx={{
      width: 100,
      height: 100,
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <UserCircle size={48} fill="#999" />
  </Box>
);

const ImageWithFallbackDocs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        ImageWithFallback
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Image components that gracefully handle loading errors by displaying a
        fallback image or component.
      </Typography>

      <DocSection
        title="Basic Usage"
        description="Image with a fallback URL when the primary image fails to load."
      >
        <ExampleBox>
          <Stack direction="row" spacing={4} alignItems="center">
            <Stack alignItems="center" spacing={1}>
              <ImageWithFallback
                src="https://picsum.photos/100/100"
                fallbackSrc="https://via.placeholder.com/100x100?text=Fallback"
                alt="Valid image"
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
              <Typography variant="caption">Valid Image</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <ImageWithFallback
                src="https://invalid-url.com/broken.jpg"
                fallbackSrc="https://via.placeholder.com/100x100?text=Fallback"
                alt="Broken image"
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
              <Typography variant="caption">Broken → Fallback</Typography>
            </Stack>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import { ImageWithFallback } from '@flipspacesit/fs-ui';

<ImageWithFallback
  src="https://example.com/image.jpg"
  fallbackSrc="https://example.com/placeholder.jpg"
  alt="Product image"
  style={{ width: 100, height: 100, borderRadius: 8 }}
/>`}
        />
      </DocSection>

      <DocSection
        title="With Fallback Component"
        description="Use a React component as fallback instead of an image URL."
      >
        <ExampleBox>
          <Stack direction="row" spacing={4} alignItems="center">
            <Stack alignItems="center" spacing={1}>
              <ImageWithFallbackComponent
                src="https://picsum.photos/100/100?random=1"
                FallbackComp={PlaceholderIcon}
                alt="User avatar"
                width={100}
                height={100}
                style={{ borderRadius: 8 }}
              />
              <Typography variant="caption">Valid Image</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <ImageWithFallbackComponent
                src=""
                FallbackComp={PlaceholderIcon}
                alt="Missing avatar"
                width={100}
                height={100}
              />
              <Typography variant="caption">No src → Component</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <ImageWithFallbackComponent
                src="https://broken-url.com/image.jpg"
                FallbackComp={PlaceholderIcon}
                alt="Broken avatar"
                width={100}
                height={100}
              />
              <Typography variant="caption">Broken → Component</Typography>
            </Stack>
          </Stack>
        </ExampleBox>
        <CodeBlock
          code={`import { ImageWithFallbackComponent } from '@flipspacesit/fs-ui';
import { UserCircle } from '@flipspacesit/fs-ui';

const PlaceholderIcon = () => (
  <Box sx={{ p: 2, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
    <UserCircle size={48} fill="#999" />
  </Box>
);

<ImageWithFallbackComponent
  src={user.avatarUrl}
  FallbackComp={PlaceholderIcon}
  alt="User avatar"
  width={100}
  height={100}
  style={{ borderRadius: 8 }}
/>`}
        />
      </DocSection>

      <DocSection
        title="Use Cases"
        description="Common scenarios for using image fallbacks."
      >
        <ExampleBox>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                User Avatars
              </Typography>
              <Stack direction="row" spacing={2}>
                {[1, 2, 3].map((i) => (
                  <ImageWithFallback
                    key={i}
                    src={`https://picsum.photos/50/50?random=${i}`}
                    fallbackSrc="https://via.placeholder.com/50x50?text=?"
                    alt={`User ${i}`}
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                ))}
                <ImageWithFallback
                  src=""
                  fallbackSrc="https://via.placeholder.com/50x50?text=?"
                  alt="Missing user"
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Product Images
              </Typography>
              <Stack direction="row" spacing={2}>
                <ImageWithFallback
                  src="https://picsum.photos/80/80?random=10"
                  fallbackSrc="https://via.placeholder.com/80x80?text=No+Image"
                  alt="Product"
                  style={{ width: 80, height: 80, borderRadius: 4 }}
                />
                <ImageWithFallback
                  src=""
                  fallbackSrc="https://via.placeholder.com/80x80?text=No+Image"
                  alt="Missing product"
                  style={{ width: 80, height: 80, borderRadius: 4 }}
                />
              </Stack>
            </Box>
          </Stack>
        </ExampleBox>
      </DocSection>

      <DocSection title="ImageWithFallback Props">
        <PropsTable
          props={[
            {
              name: "src",
              type: "string",
              default: "-",
              description: "Primary image source URL",
            },
            {
              name: "fallbackSrc",
              type: "string",
              default: "-",
              description: "Fallback image URL when primary fails",
            },
            {
              name: "alt",
              type: "string",
              default: "-",
              description: "Alt text for the image",
            },
            {
              name: "...imgProps",
              type: "ImgHTMLAttributes",
              default: "-",
              description: "All standard img attributes (style, className, etc.)",
            },
          ]}
        />
      </DocSection>

      <DocSection title="ImageWithFallbackComponent Props">
        <PropsTable
          props={[
            {
              name: "src",
              type: "string",
              default: "-",
              description: "Primary image source URL",
            },
            {
              name: "FallbackComp",
              type: "React.ComponentType",
              default: "-",
              description: "Component to render when image fails",
            },
            {
              name: "alt",
              type: "string",
              default: "-",
              description: "Alt text for the image",
            },
            {
              name: "width",
              type: "number | string",
              default: "-",
              description: "Width of the container/image",
            },
            {
              name: "height",
              type: "number | string",
              default: "-",
              description: "Height of the container/image",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              default: "-",
              description: "Additional styles for the image",
            },
          ]}
        />
      </DocSection>
    </Box>
  );
};

export default ImageWithFallbackDocs;
