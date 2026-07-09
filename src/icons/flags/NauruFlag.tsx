export const NauruFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#NauruFlag_a)"><path fill="#012169" d="M0 0h400v200H0z"/><path fill="#ffc72c" d="M0 91.7h400v16.6H0z"/><path fill="#fff" d="m100 175-4.3-17.2-12.4 12.7 5-17-17.2 4.8L84 146l-17.2-4.3 17.2-4.3L71.1 125l17.1 4.9-4.9-17.1 12.4 12.8 4.3-17.3 4.3 17.3 12.4-12.8-5 17L129 125l-13 12.4 17.2 4.3L116 146l12.8 12.3-17.1-4.8 4.9 17-12.4-12.7z"/></g><defs><clipPath id="NauruFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
