import React from "react";

interface CheckCircleProps {
  size?: number | string;
  fill?: string;
}

export const CheckRectangle: React.FC<CheckCircleProps> = ({
  size = 18,
  fill = "#FFFFFF",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.04962 10.0068C4.00046 10.0539 3.97266 10.1191 3.97266 10.1872C3.97266 10.2554 4.00046 10.3205 4.04962 10.3677L8.02573 14.1804C8.12244 14.2732 8.27508 14.2732 8.37179 14.1804L15.9512 6.91236C16.0004 6.86521 16.0282 6.80004 16.0282 6.73191C16.0282 6.66379 16.0004 6.59862 15.9512 6.55147L15.188 5.81956C15.0913 5.72681 14.9386 5.72681 14.8419 5.81956L8.19876 12.1898L5.15896 9.27487C5.06224 9.18213 4.90961 9.18213 4.8129 9.27487L4.04962 10.0068Z"
        fill={fill}
        stroke={fill}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckRectangle;
