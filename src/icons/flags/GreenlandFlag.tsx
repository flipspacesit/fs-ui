export const GreenlandFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#GreenlandFlag_a)"><path fill="#fff" d="M300 0H0v200h300z"/><path fill="#c8102e" d="M0 100h300v100H0zm50 0a66.7 66.7 0 1 0 133.3 0A66.7 66.7 0 0 0 50 100"/></g><defs><clipPath id="GreenlandFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
