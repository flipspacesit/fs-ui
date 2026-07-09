export const GhanaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#GhanaFlag_a)"><path fill="#006b3f" d="M0 0h300v200H0z"/><path fill="#fcd116" d="M0 0h300v133.3H0z"/><path fill="#ce1126" d="M0 0h300v66.7H0z"/><path fill="#000" d="m150 66.7 21.7 66.6-56.8-41.2H185l-56.7 41.2z"/></g><defs><clipPath id="GhanaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
