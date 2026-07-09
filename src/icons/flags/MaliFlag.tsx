export const MaliFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#MaliFlag_a)"><path fill="#ce1126" d="M0 0h300v200H0z"/><path fill="#fcd116" d="M0 0h200v200H0z"/><path fill="#14b53a" d="M0 0h100v200H0z"/></g><defs><clipPath id="MaliFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
