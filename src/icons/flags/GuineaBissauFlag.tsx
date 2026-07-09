export const GuineaBissauFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#GuineaBissauFlag_a)"><path fill="#fcd116" d="M400 0H0v200h400z"/><path fill="#009e49" d="M400 100H0v100h400z"/><path fill="#ce1126" d="M133.3 0H0v200h133.3z"/><path fill="#000" d="m78.8 104 19.6-14.3H74l-7.4-23-7.5 23H35l19.5 14.2-7.4 23 19.6-14.2L86.3 127z"/></g><defs><clipPath id="GuineaBissauFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
