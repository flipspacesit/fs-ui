export const PanamaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#PanamaFlag_a)"><path fill="#fff" d="M0 100V0h150l150 100v100H150z"/><path fill="#da121a" d="M150 0h150v100H150zm75 125 16.2 50-42.5-30.9h52.6L208.8 175z"/><path fill="#072357" d="M0 100h150v100H0zm75-75 16.2 50-42.5-30.9h52.6L58.8 75z"/></g><defs><clipPath id="PanamaFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
