export const ColombiaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#ColombiaFlag_a)"><path fill="#ffcd00" d="M0 0h300v200H0z"/><path fill="#003087" d="M0 100h300v100H0z"/><path fill="#c8102e" d="M0 150h300v50H0z"/></g><defs><clipPath id="ColombiaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
