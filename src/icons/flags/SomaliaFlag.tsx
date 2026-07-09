export const SomaliaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#SomaliaFlag_a)"><path fill="#418fde" d="M300 0H0v200h300z"/><path fill="#fff" d="M139.2 85.1 150 52l10.8 33h35l-28.3 20.6 10.8 33.3-28.3-20.6-28.3 20.6 10.8-33.3L104.2 85z"/></g><defs><clipPath id="SomaliaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
