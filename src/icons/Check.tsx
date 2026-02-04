import React from "react";

interface CheckIconProps {
  size?: number | string;
  color?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
  size = 16,
  color = "#3361FF",
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
        d="M13.3337 4L6.00033 11.3333L2.66699 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
