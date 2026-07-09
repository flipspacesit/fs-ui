export const RomaniaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#RomaniaFlag_a)"><path fill="#002b7f" d="M300 0H0v200h300z"/><path fill="#fcd116" d="M300 0H100v200h200z"/><path fill="#ce1126" d="M300 0H200v200h100z"/></g><defs><clipPath id="RomaniaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
