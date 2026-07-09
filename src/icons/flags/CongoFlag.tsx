export const CongoFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#CongoFlag_a)"><path fill="#fbde4a" d="M0 0h300v200H0z"/><path fill="#009543" d="M0 200V0h200z"/><path fill="#da1a35" d="M300 0v200H100z"/></g><defs><clipPath id="CongoFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
