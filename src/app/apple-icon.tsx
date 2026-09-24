import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#17181c",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 38,
            top: 134,
            width: 146,
            height: 3,
            borderRadius: 2,
            background: "#e8c6a8",
            opacity: 0.55,
            transform: "rotate(-42.7deg)",
            transformOrigin: "0% 50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 128,
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: "#ffffff",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            width: 31,
            height: 31,
            borderRadius: "50%",
            background: "rgba(193,98,46,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#c1622e",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
