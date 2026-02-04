import React from "react";

interface CloseIconProps {
  size?: number | string;
  color?: string;
}

export const CloseIcon: React.FC<CloseIconProps> = ({
  size = 24,
  color = "#1B1C1E",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
