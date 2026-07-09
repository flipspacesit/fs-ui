export const PakistanFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#PakistanFlag_a)"><path fill="#fff" d="M300 0H0v200h300z"/><path fill="#01411c" d="M300 0H75v200h225z"/><path fill="#fff" d="M187.5 160a60 60 0 1 0 0-120 60 60 0 0 0 0 120"/><path fill="#01411c" d="M202.8 141.4a55 55 0 1 0 0-110 55 55 0 0 0 0 110"/><path fill="#fff" d="m209.4 55.1 25.3 28.4-37.2-8.1 34.8-15.3L213.2 93z"/></g><defs><clipPath id="PakistanFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
