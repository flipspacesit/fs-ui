export const GreeceFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#GreeceFlag_a)"><path fill="#005db5" d="M300 0H0v200h300z"/><path fill="#fff" d="M300 177.8H0v-22.2h300zm0-44.5H0v-22.2h44.4V66.7H0V44.4h44.4V0h22.3v44.4H111v22.3h189v22.2H111.1V66.7H66.7V111H300zm0-88.9H111.1V22.2H300z"/></g><defs><clipPath id="GreeceFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
