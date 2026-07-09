export const ChileFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#ChileFlag_a)"><path fill="#fff" d="M0 0h300v200H0z"/><path fill="#0039a6" d="M0 100V0h100v150z"/><path fill="#d72b1f" d="M0 100h300v100H0z"/><path fill="#fff" d="m50 25 14.5 45L26 42.5h47.5L35 70.5l14.5-45z"/></g><defs><clipPath id="ChileFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
