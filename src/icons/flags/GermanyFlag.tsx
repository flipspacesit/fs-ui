export const GermanyFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 334}
      viewBox="0 0 334 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#GermanyFlag_a)"><path fill="#000" d="M333.3 0H0v200h333.3z"/><path fill="#d00" d="M333.3 66.7H0V200h333.3z"/><path fill="#ffce00" d="M333.3 133.3H0V200h333.3z"/></g><defs><clipPath id="GermanyFlag_a"><path fill="#fff" d="M0 0h333.3v200H0z"/></clipPath></defs>
    </svg>
  )
}
