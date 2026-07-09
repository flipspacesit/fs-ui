export const CubaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#CubaFlag_a)"><path fill="#002a8f" d="M0 0h400v200H0z"/><path fill="#fff" d="M40 40h360v40H120v40h280v40H40z"/><path fill="#cb1515" d="M173.2 100 0 200V0z"/><path fill="#fff" d="m57.7 66.7-19.6 60.2 51.4-37.3H26l51.3 37.3z"/></g><defs><clipPath id="CubaFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
