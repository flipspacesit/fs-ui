export const SwedenFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 320}
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#SwedenFlag_a)"><path fill="#006aa7" d="M320 0H0v200h320z"/><path fill="#fecc00" d="M140 0h-40v200h40z"/><path fill="#fecc00" d="M320 80H0v40h320z"/></g><defs><clipPath id="SwedenFlag_a"><path fill="#fff" d="M0 0h320v200H0z"/></clipPath></defs>
    </svg>
  )
}
