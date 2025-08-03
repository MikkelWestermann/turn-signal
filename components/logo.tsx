import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => (
  <svg
    width="754"
    height="820"
    viewBox="0 0 754 820"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('text-foreground', className)}
  >
    <rect
      x="42"
      y="437"
      width="669"
      height="341"
      className="fill-stone-200 dark:fill-stone-600"
    />
    <rect
      x="42"
      y="50"
      width="669"
      height="341"
      className="fill-stone-500 dark:fill-stone-400"
    />
    <rect
      x="54.5"
      y="407.5"
      width="636"
      height="33"
      className="stroke-gray-900 dark:stroke-gray-100"
      strokeWidth="33"
    />
    <mask id="path-4-inside-1_790_146" fill="white">
      <path d="M0 25C0 11.1929 11.1929 0 25 0H629C698.036 0 754 55.9644 754 125V695C754 764.036 698.036 820 629 820H25C11.1929 820 0 808.807 0 795V25Z" />
    </mask>
    <path
      d="M0 25C0 11.1929 11.1929 0 25 0H629C698.036 0 754 55.9644 754 125V695C754 764.036 698.036 820 629 820H25C11.1929 820 0 808.807 0 795V25Z"
      className="stroke-gray-900 dark:stroke-gray-100"
      strokeWidth="100"
      mask="url(#path-4-inside-1_790_146)"
    />
    <path
      d="M503.553 575.295L391.645 714H377.564L365.137 548.968L503.553 575.295Z"
      className="stroke-gray-900 dark:stroke-gray-100"
      strokeWidth="150"
    />
    <path
      d="M382.174 386H261.826L322 304.109L382.174 386Z"
      className="stroke-gray-900 dark:stroke-gray-100"
      strokeWidth="25"
    />
    <circle
      cx="477"
      cy="410"
      r="180"
      className="fill-yellow-400 dark:fill-yellow-500"
      stroke="currentColor"
      strokeWidth="40"
    />
    <path
      d="M415.241 286.591C433.322 277.543 453.17 272.578 473.381 272.047L475.006 333.993C463.87 334.285 452.935 337.021 442.973 342.006L415.241 286.591Z"
      className="fill-gray-100 dark:fill-gray-800"
    />
    <path
      d="M604.622 462.504C596.716 481.72 584.574 498.902 569.1 512.769C553.627 526.637 535.221 536.831 515.257 542.591C495.294 548.351 474.287 549.529 453.804 546.037C433.321 542.544 413.892 534.471 396.965 522.421C380.038 510.37 366.051 494.652 356.047 476.441C346.043 458.229 340.281 437.994 339.19 417.244C338.1 396.495 341.708 375.767 349.748 356.607C357.787 337.447 370.049 320.349 385.619 306.59L426.652 353.025C418.074 360.606 411.318 370.026 406.888 380.582C402.459 391.139 400.471 402.559 401.072 413.991C401.673 425.424 404.847 436.573 410.359 446.607C415.871 456.641 423.577 465.3 432.904 471.94C442.23 478.579 452.935 483.027 464.22 484.951C475.505 486.876 487.079 486.227 498.078 483.053C509.078 479.879 519.219 474.263 527.744 466.622C536.269 458.982 542.96 449.515 547.315 438.928L604.622 462.504Z"
      className="fill-gray-100 dark:fill-gray-800"
    />
  </svg>
);

export default Logo;
