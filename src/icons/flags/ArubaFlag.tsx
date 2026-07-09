export const ArubaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#ArubaFlag_a)"><path fill="#418fde" d="M0 0h300v200H0z"/><path fill="#ffd100" d="M0 133.3h300v11.1H0v11.2h300v11H0z"/><path fill="#fff" d="m44.4 11.1-7.8 25.5L11 44.4l25.5 7.9 7.8 25.5 7.9-25.5 25.5-7.9-25.5-7.8z"/><path fill="#ef3340" d="m44.4 18.7 6.1 19.7 19.7 6-19.7 6.1-6 19.7-6.1-19.7-19.7-6 19.7-6.1z"/></g><defs><clipPath id="ArubaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
