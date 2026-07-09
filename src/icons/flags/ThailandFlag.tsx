export const ThailandFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#ThailandFlag_a)"><path fill="#a51931" d="M300 0H0v200h300z"/><path fill="#f4f5f8" d="M300 33.3H0v133.4h300z"/><path fill="#2d2a4a" d="M300 66.7H0v66.6h300z"/></g><defs><clipPath id="ThailandFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
