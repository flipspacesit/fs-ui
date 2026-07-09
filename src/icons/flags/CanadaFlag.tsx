export const CanadaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#CanadaFlag_a)"><path fill="#d52b1e" d="M0 0h100l4.1 4.1H296l4-4.1h100v200H300l-4.1-4.1H104l-4 4.1H0z"/><path fill="#fff" d="M100 0h200v200H100zm103.8 184.6-2-36a4 4 0 0 1 4.7-4l35.8 6.2-4.8-13.3a3 3 0 0 1 .8-3l39.2-31.8-8.8-4.1a3 3 0 0 1-1.4-3.3l7.7-23.8-22.6 4.8a3 3 0 0 1-3-1.6L245 64.4l-17.6 18.9a2.7 2.7 0 0 1-4.7-2.4l8.6-43.8-13.7 7.9a2.7 2.7 0 0 1-3.8-1.2L200 16.7l-13.8 27.1a2.7 2.7 0 0 1-3.8 1.2l-13.7-8 8.6 44a2.7 2.7 0 0 1-4.7 2.3l-17.6-19-4.4 10.4a3 3 0 0 1-3 1.5L125 71.6l7.8 23.8a3 3 0 0 1-1.5 3.3l-8.8 4.1 39.2 31.8a3 3 0 0 1 .8 3l-4.8 13.3 35.8-6.3a4 4 0 0 1 4.6 4.1l-1.8 36z"/></g><defs><clipPath id="CanadaFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
