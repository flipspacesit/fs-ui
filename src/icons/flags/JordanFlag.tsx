export const JordanFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#JordanFlag_a)"><path fill="#fff" d="M0 0h400v200H0z"/><path fill="#000" d="M0 0h400v66.7H0z"/><path fill="#007a3d" d="M0 133.3h400V200H0z"/><path fill="#ce1126" d="M200 100 0 200V0m61.8 85.7-3.1 7.9-8-2.5 4.1 7.3-7 4.8 8.4 1.2-.6 8.5 6.2-5.8L68 113l-.6-8.5 8.3-1.2-7-4.8 4.3-7.3-8 2.5z"/></g><defs><clipPath id="JordanFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
