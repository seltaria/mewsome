import { FC } from "react";

type ArrowIconProps = {
  type?: "single" | "double";
  size?: number;
  rotate?: number;
};

export const ArrowIcon: FC<ArrowIconProps> = ({
  type = "single",
  size = 20,
  rotate = 0,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {type === "single" ? (
        <g clipPath="url(#clip0_34_2)">
          <path
            d="M29.64 61.64L48 43.32L66.36 61.64L72 56L48 32L24 56L29.64 61.64Z"
            fill="black"
          />
        </g>
      ) : (
        <g clipPath="url(#clip0_36_8)">
          <path
            d="M70.3604 72L76.0004 66.36L57.6804 48L76.0004 29.64L70.3604 24L46.3604 48L70.3604 72Z"
            fill="black"
          />
          <path
            d="M44 72L49.64 66.36L31.32 48L49.64 29.64L44 24L20 48L44 72Z"
            fill="black"
          />
        </g>
      )}

      <defs>
        <clipPath id="clip0_34_2">
          <rect width="96" height="96" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
