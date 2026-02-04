import React, { useState } from "react";
import { Stack } from "@mui/material";

export interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Primary image source */
  src?: string;
  /** Fallback image source when primary fails */
  fallbackSrc: string;
  /** Alt text for the image */
  alt: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  ...props
}) => {
  const [error, setError] = useState(false);

  const handleImageError = () => {
    setError(true);
  };

  return (
    <img
      src={error || !src ? fallbackSrc : src}
      alt={alt}
      onError={handleImageError}
      {...props}
    />
  );
};

export interface ImageWithFallbackComponentProps {
  /** Primary image source */
  src?: string;
  /** Fallback component to render when image fails */
  FallbackComp: React.ComponentType;
  /** Alt text for the image */
  alt: string;
  /** Width of the container/image */
  width?: number | string;
  /** Height of the container/image */
  height?: number | string;
  /** Additional image props */
  style?: React.CSSProperties;
}

export const ImageWithFallbackComponent: React.FC<
  ImageWithFallbackComponentProps
> = ({ src, FallbackComp, alt, width, height, style, ...props }) => {
  const [error, setError] = useState(false);

  const handleImageError = () => {
    setError(true);
  };

  if (error || !src) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width, height }}
        {...props}
      >
        <FallbackComp />
      </Stack>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleImageError}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};

export default ImageWithFallback;
