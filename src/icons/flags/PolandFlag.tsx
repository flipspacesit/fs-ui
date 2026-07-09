export const PolandFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 320}
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#PolandFlag_a)"><path fill="#fff" d="M320 0H0v200h320z"/><path fill="#dc143c" d="M320 100H0v100h320z"/></g><defs><clipPath id="PolandFlag_a"><path fill="#fff" d="M0 0h320v200H0z"/></clipPath></defs>
    </svg>
  )
}
