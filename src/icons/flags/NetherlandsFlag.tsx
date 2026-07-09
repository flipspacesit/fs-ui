export const NetherlandsFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#NetherlandsFlag_a)"><path fill="#21468b" d="M300 0H0v200h300z"/><path fill="#fff" d="M300 0H0v133.3h300z"/><path fill="#ae1c28" d="M300 0H0v66.7h300z"/></g><defs><clipPath id="NetherlandsFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
