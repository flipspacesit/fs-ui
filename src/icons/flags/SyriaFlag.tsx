export const SyriaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#SyriaFlag_a)"><path fill="#000" d="M0 0h300v200H0z"/><path fill="#fff" d="M0 0h300v133.3H0z"/><path fill="#ce1126" d="M0 0h300v66.7H0z"/><path fill="#007a3d" d="M83.8 125 100 75l16.3 50-42.6-30.9h52.6m57.5 30.9L200 75l16.3 50-42.6-30.9h52.6"/></g><defs><clipPath id="SyriaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
