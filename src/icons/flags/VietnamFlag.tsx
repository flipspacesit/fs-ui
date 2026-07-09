export const VietnamFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#VietnamFlag_a)"><path fill="#da251d" d="M300 0H0v200h300z"/><path fill="#ff0" d="m150 40-35.3 108.5 92.4-67H92.9l92.4 67z"/></g><defs><clipPath id="VietnamFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
