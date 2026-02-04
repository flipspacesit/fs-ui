import React from "react";

interface ArrowUpProps {
  size?: number | string;
  color?: string;
}

export const ArrowUp: React.FC<ArrowUpProps> = ({
  size = 16,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 10L8 6L4 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUp;
