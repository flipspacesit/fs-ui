export const TaiwanFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#TaiwanFlag_a)"><g fillRule="evenodd" clipRule="evenodd"><path fill="#fe0000" d="M0 0h300v200H0z"/><path fill="#000095" d="M0 0h150v100H0z"/></g><path fill="#fff" d="m75 12.5-18.7 70 51.2-51.2-70 18.7 70 18.8-51.2-51.3 18.7 70 18.8-70-51.3 51.3 70-18.8-70-18.7 51.3 51.2z"/><path fill="#fff" d="M75 70a20 20 0 1 0 0-40 20 20 0 0 0 0 40"/><path fill="#000095" d="M75 71.3a21.3 21.3 0 1 1 0-42.6 21.3 21.3 0 0 1 0 42.6m0-40a18.8 18.8 0 1 0 0 37.5 18.8 18.8 0 0 0 0-37.5"/></g><defs><clipPath id="TaiwanFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
