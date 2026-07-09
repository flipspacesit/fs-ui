export const IrelandFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#IrelandFlag_a)"><path fill="#169b62" d="M400 0H0v200h400z"/><path fill="#fff" d="M400 0H133.3v200H400z"/><path fill="#ff883e" d="M400 0H266.7v200H400z"/></g><defs><clipPath id="IrelandFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
