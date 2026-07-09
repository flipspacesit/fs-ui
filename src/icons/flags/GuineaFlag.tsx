export const GuineaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#GuineaFlag_a)"><path fill="#ce1126" d="M0 0h300v200H0z"/><path fill="#fcd116" d="M100 0h200v200H100z"/><path fill="#009460" d="M200 0h100v200H200z"/></g><defs><clipPath id="GuineaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
