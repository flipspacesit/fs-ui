export const ArmeniaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#ArmeniaFlag_a)"><path fill="#f2a800" d="M0 0h400v200H0z"/><path fill="#0033a0" d="M0 0h400v133.3H0z"/><path fill="#d90012" d="M0 0h400v66.7H0z"/></g><defs><clipPath id="ArmeniaFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
