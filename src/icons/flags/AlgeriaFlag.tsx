export const AlgeriaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#fff" d="M0 0h300v200H0z"/><path fill="#063" d="M0 0h150v200H0z"/><path fill="#d21034" d="M193.3 75a50 50 0 1 0 0 50 40 40 0 1 1 0-50m2 25L150 85.3l28 38.5V76.2l-28 38.5z"/>
    </svg>
  )
}
