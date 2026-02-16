interface LogoutProps {
  fill?: string;
  size?: number;
}

export const Logout: React.FC<LogoutProps> = ({
  fill = "#6868B4",
  size = 16,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.5 5.5V3C10.5 2.72386 10.2761 2.5 10 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H10C10.2761 13.5 10.5 13.2761 10.5 13V10.5'
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.5 8H13.5'
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.5 6L13.5 8L11.5 10'
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
