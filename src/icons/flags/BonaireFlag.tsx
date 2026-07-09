export const BonaireFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 300}
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#BonaireFlag_a)"><path fill="#fff" d="M0 0h300v200H0z"/><path fill="#003087" d="M300 0v200H0z"/><path fill="gold" d="M0 83.3V0h125z"/><path fill="#101820" d="m101.6 104.4 31.7-18.3-31.7-18.3-18.3-31.7L65 67.8 33.3 86.1 65 104.4l18.3 31.7z"/><path fill="#101820" d="M83.3 129.4a43.3 43.3 0 1 0 0-86.6 43.3 43.3 0 0 0 0 86.6"/><path fill="#fff" d="M83.3 123.6a37.5 37.5 0 1 0 0-75 37.5 37.5 0 0 0 0 75"/><path fill="#d50032" d="m97.8 86.1 7.2-12.5H90.6l-7.3-12.5-7.2 12.5H61.7l7.2 12.5-7.2 12.5H76l7.2 12.5 7.3-12.5H105z"/></g><defs><clipPath id="BonaireFlag_a"><path fill="#fff" d="M0 0h300v200H0z"/></clipPath></defs>
    </svg>
  )
}
