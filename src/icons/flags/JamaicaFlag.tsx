export const JamaicaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#JamaicaFlag_a)"><path fill="#007749" d="M0 0h400v200H0z"/><path fill="#000" d="m0 0 200 100L0 200zm400 0L200 100l200 100z"/><path fill="#ffb81c" d="M200 81.4 362.7 0H400v18.6L237.3 100 400 181.4V200h-37.3L200 118.6 37.3 200H0v-18.6L162.7 100 0 18.6V0h37.3z"/></g><defs><clipPath id="JamaicaFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
