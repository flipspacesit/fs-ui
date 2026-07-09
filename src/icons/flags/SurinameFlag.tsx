export const SurinameFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#SurinameFlag_a)"><path fill="#377e3f" d="M300 0H0v200h300z"/><path fill="#fff" d="M300 40H0v120h300z"/><path fill="#b40a2d" d="M300 60H0v80h300z"/><path fill="#ecc81d" d="M112 91.5h29l9-27.7 9 27.7h29l-23.5 17 9 27.7L150 119l-23.5 17 9-27.6z"/></g><defs><clipPath id="SurinameFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
