export const MyanmarFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#MyanmarFlag_a)"><path fill="#fecb00" d="M300 0H0v200h300z"/><path fill="#34b233" d="M300 66.7H0V200h300z"/><path fill="#ea2839" d="M300 133.3H0V200h300z"/><path fill="#fff" d="m176.8 115.7 43.4-31.4h-53.7l-16.5-51-16.5 51H79.8l43.4 31.4-16.5 51 43.3-31.5 43.3 31.5z"/></g><defs><clipPath id="MyanmarFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
