export const OutlineThumbsUp = ({ size = 24, stroke = 'black' }: { size?: number, stroke?: string }) => {
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
              d="M23.25 23.25V0.75H0.75V23.25H23.25Z"
              fill="white"
              stroke="white"
              strokeWidth="1.5"
            />
          </mask>
  
          <g mask="url(#mask0)">
            <path
              d="M15.8592 19.1461H19.3821C20.3015 19.1461 21.0469 19.8915 21.0469 20.8109C21.0469 21.7304 20.3015 22.4757 19.3821 22.4757H8.77561L5.146 21.1067V9.6657H6.97505L11.7279 4.16718L12.1418 1.8871C12.1705 1.72893 12.2538 1.58587 12.3772 1.48286C12.5006 1.37985 12.6563 1.32342 12.817 1.32343H13.6294C14.8079 1.32343 15.7634 2.27888 15.7634 3.45745C15.7634 4.34596 15.5896 5.22585 15.2517 6.04762L14.0293 9.15739H14.3422"
              stroke={stroke}
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
  
            <path
              d="M17.2227 12.487H20.9216C21.841 12.487 22.5864 11.7416 22.5864 10.8222C22.5864 9.90279 21.841 9.15743 20.9216 9.15743H14.3423"
              stroke={stroke}
              strokeWidth="1.5"
            />
  
            <path
              d="M18.1091 12.487H21.632C22.5515 12.487 23.2968 13.2324 23.2968 14.1518C23.2968 15.0712 22.5515 15.8166 21.632 15.8166H18.1091"
              stroke={stroke}
              strokeWidth="1.5"
            />
  
            <path
              d="M17.1104 15.8165H20.6332C21.5527 15.8165 22.298 16.5619 22.298 17.4814C22.298 18.4008 21.5527 19.1461 20.6332 19.1461H17.1104"
              stroke={stroke}
              strokeWidth="1.5"
            />
  
            <path
              d="M5.14611 22.679H0.703125V8.32339H5.14611V22.679Z"
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
  
  