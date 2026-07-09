export const NorthKoreaFlag = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={(size * 200) / 400}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#NorthKoreaFlag_a)"><path fill="#024fa2" d="M400 0H0v200h400z"/><path fill="#fff" d="M400 33.3H0v133.4h400z"/><path fill="#ed1c27" d="M400 38.9H0V161h400z"/><path fill="#fff" d="M133.3 144.4a44.4 44.4 0 1 0 0-88.8 44.4 44.4 0 0 0 0 88.8"/><path fill="#ed1c27" d="m149 105 25.3-18.3H143L133.3 57l-9.6 29.8H92.4l25.3 18.4-9.7 29.7 25.3-18.4 25.4 18.4z"/></g><defs><clipPath id="NorthKoreaFlag_a"><path fill="#fff" d="M0 0h400v200H0z"/></clipPath></defs>
    </svg>
  )
}
