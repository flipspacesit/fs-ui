export const IndonesiaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#fff" d="M0 0h300v200H0z"/><path fill="red" d="M0 0h300v100H0z"/>
    </svg>
  )
}
