interface CheckSquareOffsetProps {
  fill?: string;
  size?: number;
}

export const CheckSquareOffset: React.FC<CheckSquareOffsetProps> = ({
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
        d='M2.5 9V3C2.5 2.86739 2.55268 2.74021 2.64645 2.64645C2.74021 2.55268 2.86739 2.5 3 2.5H13C13.1326 2.5 13.2598 2.55268 13.3536 2.64645C13.4473 2.74021 13.5 2.86739 13.5 3V13C13.5 13.1326 13.4473 13.2598 13.3536 13.3536C13.2598 13.4473 13.1326 13.5 13 13.5H8.5'
        stroke={fill}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M2.5 12L4 13.5L7.5 10'
        stroke={fill}
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
