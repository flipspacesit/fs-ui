export const JapanFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#JapanFlag_a)"><path fill="#fff" d="M300 0H0v200h300z"/><path fill="#bc002d" d="M150 160a60 60 0 1 0 0-120 60 60 0 0 0 0 120"/></g><defs><clipPath id="JapanFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
