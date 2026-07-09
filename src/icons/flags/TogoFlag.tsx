export const TogoFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 324}
      viewBox="0 0 324 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#TogoFlag_a)"><path fill="#006a4e" d="M0 0h323.6v200H0z"/><path fill="#ffce00" d="M0 40h323.6v40H0z"/><path fill="#d21034" d="M0 0h120v140H0z"/><path fill="#ffce00" d="M0 120h323.6v40H0z"/><path fill="#fff" d="m73.8 64.5 22.3-16.2H68.5L60 22l-8.5 26.3H23.9l22.3 16.2-8.5 26.2L60 74.5l22.3 16.2z"/></g><defs><clipPath id="TogoFlag_a"><path fill="#fff" d="M0 0h323.6v200H0z"/></clipPath></defs>
    </svg>
  )
}
