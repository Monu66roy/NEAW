type TopoArtProps = {
  className?: string;
};

/**
 * A generic, hand-built contour-line illustration referencing the Himalayan
 * ridgelines and river channels that define NEAW's operating landscape.
 * Not a reproduction of any photograph, artwork, or third-party asset.
 */
export default function TopoArt({ className = "" }: TopoArtProps) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke="var(--blue)" strokeOpacity="0.18" strokeWidth="1.5">
        <path d="M0 320 C 80 260, 140 300, 220 240 S 360 180, 480 220" />
        <path d="M0 350 C 90 300, 150 330, 230 270 S 370 210, 480 250" />
        <path d="M0 380 C 100 340, 160 360, 240 300 S 380 240, 480 280" />
      </g>
      <g stroke="var(--green)" strokeOpacity="0.22" strokeWidth="1.5">
        <path d="M40 120 L 120 40 L 170 90 L 250 20 L 310 70 L 400 10" />
        <path d="M60 150 L 130 80 L 180 120 L 255 55 L 320 100 L 410 45" />
      </g>
      <circle cx="380" cy="90" r="30" fill="var(--green-light)" fillOpacity="0.15" />
      <circle cx="120" cy="360" r="46" fill="var(--blue)" fillOpacity="0.1" />
    </svg>
  );
}
