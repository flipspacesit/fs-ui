function EqualtoCircle({
  size = 12,
  stroke = '#36763E',
}: {
  size?: number
  stroke?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
    >
      <circle cx="5.69" cy="5.69" r="5.69" fill="#C3E8CA" />
      <path
        d="M3.46875 6.61719L7.9102 6.6112"
        stroke={stroke}
        stroke-linecap="round"
      />
      <path
        d="M3.46875 4.77344L7.91037 4.77379"
        stroke={stroke}
        stroke-linecap="round"
      />
    </svg>
  )
}

export default EqualtoCircle
