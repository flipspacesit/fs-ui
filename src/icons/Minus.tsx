interface MinusProps {
  size?: number;
  fill?: string;
}

export const Minus: React.FC<MinusProps> = ({
  size = 11,
  fill = "#1B1C1E",
}) => {
  return (
    <svg
      width={size}
      height='3'
      viewBox='0 0 11 3'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.05461 1.19465L1.05461 2.30591H5.34439H6.41684H10.7066L10.7066 1.19465L6.41684 1.19465H5.34439L1.05461 1.19465Z'
        fill={fill}
        stroke={fill}
        stroke-width='0.5'
        stroke-linejoin='round'
      />
    </svg>
  );
};
