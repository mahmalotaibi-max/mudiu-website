import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Kept pixel-consistent with icon.svg (the browser-tab favicon) by reusing
// the exact same path/circle mark, just scaled up - rather than an
// approximated shape, so the icon looks identical everywhere it appears.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#17181c",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path
            d="M7 25C10.5 20.5 13 19 17 16.5C21 14 23 11 25 7"
            stroke="#e8c6a8"
            strokeOpacity={0.55}
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />
          <circle cx={25} cy={7} r={5.5} fill="#c1622e" fillOpacity={0.18} />
          <circle cx={25} cy={7} r={3.2} fill="#c1622e" />
          <circle cx={7} cy={25} r={2.3} fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
