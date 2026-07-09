export const HungaryFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#HungaryFlag_a)"><path fill="#477050" d="M0 0h400v200H0"/><path fill="#fff" d="M0 0h400v133.3H0"/><path fill="#ce2939" d="M0 0h400v66.7H0"/></g><defs><clipPath id="HungaryFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
