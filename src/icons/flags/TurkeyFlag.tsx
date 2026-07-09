export const TurkeyFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#TurkeyFlag_a)"><path fill="#e30a17" d="M0 0h300v200H0z"/><path fill="#fff" d="m139.2 100 45.2-14.7-28 38.5V76.2l28 38.5zm3 26.7a50 50 0 1 1 0-53.4 40 40 0 1 0 0 53.4"/></g><defs><clipPath id="TurkeyFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
