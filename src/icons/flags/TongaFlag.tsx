export const TongaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#TongaFlag_a)"><path fill="#c10000" d="M400 0H0v200h400z"/><path fill="#fff" d="M166.7 0H0v100h166.7z"/><path fill="#c10000" d="M95.8 12.5h-25v75h25z"/><path fill="#c10000" d="M120.8 37.5h-75v25h75z"/></g><defs><clipPath id="TongaFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
