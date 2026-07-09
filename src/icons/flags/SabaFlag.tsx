export const SabaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#SabaFlag_a)"><path fill="#dc171d" d="M300 200H0V0h300z"/><path fill="#012a87" d="M300 200H0V100h300z"/><path fill="#fff" d="M150 200 0 100 150 0l150 100z"/><path fill="#f9d90f" d="m170.6 106.7 33.2-24.2h-41L150 43.4l-12.7 39.1H96.2l33.2 24.2-12.7 39 33.3-24 33.3 24z"/></g><defs><clipPath id="SabaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
