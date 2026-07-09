export const SudanFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#000" d="M0 0h400v200H0z"/><path fill="#fff" d="M0 0h400v133.3H0z"/><path fill="#d21034" d="M0 0h400v66.7H0z"/><path fill="#007229" d="m0 0 133.3 100L0 200z"/>
    </svg>
  )
}
