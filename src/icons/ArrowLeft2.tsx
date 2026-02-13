import React from 'react'

interface ArrowLeft2Props {
  size?: number | string
  color?: string
  strokeWidth?: number | string
}

export const ArrowLeft2: React.FC<ArrowLeft2Props> = ({
  size = 23,
  color = '#1B1C1E',
  strokeWidth = 2,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
    >
      <path
        d="M19.4062 11.5H3.59375"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0625 5.03125L3.59375 11.5L10.0625 17.9688"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowLeft2
