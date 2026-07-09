export const PalauFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 320}
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#PalauFlag_a)"><path fill="#09f" d="M320 0H0v200h320z"/><path fill="#ff0" d="M140 160a60 60 0 1 0 0-120 60 60 0 0 0 0 120"/></g><defs><clipPath id="PalauFlag_a"><path fill="#fff" d="M0 0h320v200H0z"/></clipPath></defs>
    </svg>
  )
}
