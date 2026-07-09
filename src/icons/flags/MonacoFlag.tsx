export const MonacoFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 250}
      viewBox="0 0 250 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#MonacoFlag_a)"><path fill="#fff" d="M0 0h250v200H0z"/><path fill="#ce1126" d="M0 0h250v100H0z"/></g><defs><clipPath id="MonacoFlag_a"><path fill="#fff" d="M0 0h250v200H0z"/></clipPath></defs>
    </svg>
  )
}
