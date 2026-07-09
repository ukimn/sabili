export function SujudLineIcon({ size = 24, color = "currentColor", ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Head / Turband area */}
      <circle cx="6" cy="17" r="2" />
      {/* Back and legs arch */}
      <path d="M8 17h2.5l2.5-4.5c.8-1.5 2.2-2.5 3.8-2.5H20c.6 0 1 .4 1 1v2c0 2.2-1.8 4-4 4h-5.5L9.5 21H4" />
      {/* Ground line */}
      <path d="M2 21h20" />
    </svg>
  );
}

export default SujudLineIcon;
