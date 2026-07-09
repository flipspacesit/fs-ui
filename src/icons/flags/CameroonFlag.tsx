export const CameroonFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#CameroonFlag_a)"><path fill="#ce1126" d="M0 0h300v200H0z"/><path fill="#007a5e" d="M0 0h100v200H0z"/><path fill="#fcd116" d="M200 0h100v200H200zm-65.7 121.3 41-29.6h-50.6l41 29.6-15.7-48z"/></g><defs><clipPath id="CameroonFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
