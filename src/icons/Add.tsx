interface AddProps {
  size?: number;
  fill?: string;
}

export const Add: React.FC<AddProps> = ({ size = 20, fill = "#1C1B1E" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.174 10.5371L5.174 9.46468H9.46378L9.46378 5.17489H10.5362L10.5362 9.46468H14.826L14.826 10.5371L10.5362 10.5371L10.5362 14.8269H9.46378L9.46378 10.5371L5.174 10.5371Z'
        fill={fill}
        stroke={fill}
        strokeLinejoin='round'
      />
    </svg>
  );
};
