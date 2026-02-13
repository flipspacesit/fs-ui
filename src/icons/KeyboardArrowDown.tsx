import React from 'react'

interface KeyboardArrowDownProps {
  width?: number | string
  height?: number | string
  fill?: string
}

export const KeyboardArrowDown: React.FC<KeyboardArrowDownProps> = ({
  width = 7,
  height = 12,
  fill = '#1B1C1E',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 7 12"
    fill="none"
  >
    <path
      d="M6.7 5.6498L1.05 11.2998L-4.5897e-08 10.2498L4.6 5.6498L-4.48042e-07 1.0498L1.05 -0.000194595L6.7 5.6498Z"
      fill={fill}
    />
  </svg>
)

export default KeyboardArrowDown
