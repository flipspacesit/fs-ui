export const SeychellesFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 401}
      viewBox="0 0 401 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#SeychellesFlag_a)"><path fill="#fff" d="M0 0h400v200H0z"/><path fill="#d22730" d="M0 200V0h400v66.7z"/><path fill="#fed141" d="M0 200V0h266.7z"/><path fill="#002f6c" d="M0 200V0h133.3z"/><path fill="#007a33" d="m0 200 400-66.7V200z"/></g><defs><clipPath id="SeychellesFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
