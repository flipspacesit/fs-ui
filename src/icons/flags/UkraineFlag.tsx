export const UkraineFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#UkraineFlag_a)"><path fill="#0057b7" d="M300 0H0v200h300z"/><path fill="gold" d="M300 100H0v100h300z"/></g><defs><clipPath id="UkraineFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
