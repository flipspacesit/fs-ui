export const MauritaniaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#MauritaniaFlag_a)"><path fill="#d01c1f" d="M0 0h300v200H0z"/><path fill="#00a95c" d="M0 40h300v120H0z"/><path fill="gold" d="M129.9 74.4h15.3L150 60l4.8 14.4h15.3l-12.6 9.2 5.1 14.6-12.6-9-12.6 9 5.1-14.6zM75 67c6.8 34.2 46 57.4 87.3 51.8 32.2-4.4 57.4-25.2 62.7-51.8a74 74 0 0 1-75 73 74 74 0 0 1-75-73"/></g><defs><clipPath id="MauritaniaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
