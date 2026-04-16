export const OutlineThumbsDown = ({ size = 24, stroke = 'black' }: { size?: number, stroke?: string }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clipPath="url(#clip0)">
          <mask
            id="mask0"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <path
              d="M23.25 0.750061V23.2501H0.75V0.750061H23.25Z"
              fill="white"
              stroke="white"
              strokeWidth="1.5"
            />
          </mask>
  
          <g mask="url(#mask0)">
            <path
              d="M15.8592 4.85392H19.3821C20.3015 4.85392 21.0469 4.10856 21.0469 3.18911C21.0469 2.26971 20.3015 1.52435 19.3821 1.52435H8.77561L5.146 2.89333V14.3344H6.97505L11.7279 19.8329L12.1418 22.113C12.1705 22.2711 12.2538 22.4142 12.3772 22.5172C12.5006 22.6202 12.6563 22.6766 12.817 22.6766H13.6294C14.8079 22.6766 15.7634 21.7212 15.7634 20.5426C15.7634 19.6541 15.5896 18.7742 15.2517 17.9524L14.0293 14.8427H14.3422"
              stroke={stroke}
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
  
            <path
              d="M17.2227 11.5131H20.9216C21.841 11.5131 22.5864 12.2584 22.5864 13.1778C22.5864 14.0973 21.841 14.8426 20.9216 14.8426H14.3423"
              stroke={stroke}
              strokeWidth="1.5"
            />
  
            <path
              d="M18.1091 11.513H21.632C22.5515 11.513 23.2968 10.7677 23.2968 9.84823C23.2968 8.92883 22.5515 8.18347 21.632 8.18347H18.1091"
              stroke={stroke}
              strokeWidth="1.5"
            />
  
            <path
              d="M17.1104 8.18351H20.6332C21.5527 8.18351 22.298 7.43815 22.298 6.5187C22.298 5.5993 21.5527 4.85394 20.6332 4.85394H17.1104"
              stroke={stroke}
              strokeWidth="1.5"
            />
  
            <path
              d="M5.14611 1.32111H0.703125V15.6767H5.14611V1.32111Z"
              stroke={stroke}
              strokeWidth="1.5"
            />
          </g>
        </g>
  
        <defs>
          <clipPath id="clip0">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    )
  }
  