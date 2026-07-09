export const CuracaoFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#CuracaoFlag_a)"><path fill="#002b7f" d="M300 0H0v200h300z"/><path fill="#f9e814" d="M0 125h300v25H0z"/><path fill="#fff" d="m74.7 69.3 13-9.5h-16l-5-15.4-5 15.4H45.6l13 9.5-5 15.4 13-9.5 13.1 9.5zm-35.3-34 9.8-7.1H37l-3.8-11.5-3.7 11.5h-12l9.8 7-3.7 11.6 9.7-7 9.8 7z"/></g><defs><clipPath id="CuracaoFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
