export const TanzaniaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#TanzaniaFlag_a)"><path fill="#1eb53a" d="M0 200V0h300z"/><path fill="#00a3dd" d="M300 0v200H0z"/><path fill="#fcd116" d="M228.6 0 0 152.4V200h71.4L300 47.6V0z"/><path fill="#000" d="M251.2 0 0 167.5V200h48.8L300 32.5V0z"/></g><defs><clipPath id="TanzaniaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
