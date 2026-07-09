export const FaroeIslandsFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 275}
      viewBox="0 0 275 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#FaroeIslandsFlag_a)"><path fill="#fff" d="M275 0H0v200h275z"/><g fill="#005eb8"><path d="M125 0H75v200h50z"/><path d="M275 75H0v50h275z"/></g><g fill="#ef3340"><path d="M112.5 0h-25v200h25z"/><path d="M275 87.5H0v25h275z"/></g></g><defs><clipPath id="FaroeIslandsFlag_a"><path fill="#fff" d="M0 0h275v200H0z"/></clipPath></defs>
    </svg>
  )
}
