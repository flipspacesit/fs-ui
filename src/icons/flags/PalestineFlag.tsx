export const PalestineFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#PalestineFlag_a)"><path fill="#009639" d="M400 0H0v200h400z"/><path fill="#fff" d="M400 0H0v133.3h400z"/><path fill="#000" d="M400 0H0v66.7h400z"/><path fill="#ed2e38" d="m0 0 133.3 100L0 200z"/></g><defs><clipPath id="PalestineFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
