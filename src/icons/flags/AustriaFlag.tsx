export const AustriaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#AustriaFlag_a)"><path fill="#c8102e" d="M300 0H0v200h300z"/><path fill="#fff" d="M300 66.7H0v66.6h300z"/></g><defs><clipPath id="AustriaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
