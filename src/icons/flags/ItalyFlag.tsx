export const ItalyFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#ItalyFlag_a)"><path fill="#009246" d="M100 0H0v200h100z"/><path fill="#fff" d="M200 0H100v200h100z"/><path fill="#ce2b37" d="M300 0H200v200h100z"/></g><defs><clipPath id="ItalyFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
