export const NorwayFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 275}
      viewBox="0 0 275 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#NorwayFlag_a)"><path fill="#cb0028" d="M275 0H0v200h275z"/><path fill="#fff" d="M125 200H75v-75H0V75h75V0h50v75h150v50H125z"/><path fill="#00205b" d="M112.5 200h-25v-87.5H0v-25h87.5V0h25v87.5H275v25H112.5z"/></g><defs><clipPath id="NorwayFlag_a"><path fill="#fff" d="M0 0h275v200H0z"/></clipPath></defs>
    </svg>
  )
}
