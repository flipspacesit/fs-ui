export const SamoaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#SamoaFlag_a)"><path fill="#ce1126" d="M0 0h400v200H0z"/><path fill="#002b7f" d="M0 0h200v100H0z"/><path fill="#fff" d="m100 69.4 8.6 26.4L86 79.5h28L91.4 95.8zM69.4 29.2l7 21.1-18-13h22.2l-18 13zm30.6-25 6.9 21.1-18-13H111l-18 13zM131.3 25l6.4 19.8-16.9-12.2h20.9l-16.9 12.2zm-16 25.7 4.3 13.2-11.3-8.2h14L111 64z"/></g><defs><clipPath id="SamoaFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
