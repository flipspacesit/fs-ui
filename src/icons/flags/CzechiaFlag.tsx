export const CzechiaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#CzechiaFlag_a)"><path fill="#d7141a" d="M300 0H0v200h300z"/><path fill="#fff" d="M300 0H0v100h300z"/><path fill="#11457e" d="M150 100 0 0v200z"/></g><defs><clipPath id="CzechiaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
