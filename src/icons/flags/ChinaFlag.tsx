export const ChinaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#ChinaFlag_a)"><path fill="#ee1c25" d="M0 0h300v200H0"/><path fill="#ff0" d="m50 20 17.6 54.3-46.1-33.6h57L32.4 74.3M104 10.8l-1.8 19-9.7-16.4L110 21l-18.6 4m35.8 8-9 16.9-2.6-18.9 13.2 13.7-18.7-3.3m19.3 25.2-15 11.7 5.2-18.3 6.6 17.9-15.8-10.6m-6.9 13.3-.9 19-10.4-15.8 17.8 6.7-18.4 5"/></g><defs><clipPath id="ChinaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
