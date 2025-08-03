import { ImageResponse } from "next/og";

export const alt =
  "Turn Signal - Transform GitHub Issues into Beautiful Public Roadmaps";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "oklch(0.9761 0 0)", // --background from theme
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 25% 25%, oklch(0.9729 0.0693 103.1933 / 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, oklch(0.9729 0.0693 103.1933 / 0.1) 0%, transparent 50%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Logo/Turn Signal indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "oklch(0.2161 0.0061 56.0434)", // --primary
                borderRadius: "0", // --radius from theme
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "4px 4px 0px 0px oklch(0 0% 10.1961% / 1.00)", // --shadow from theme
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "oklch(0.9761 0 0)", // --background
                  borderRadius: "0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "20px",
                    height: "20px",
                    background: "oklch(0.2161 0.0061 56.0434)", // --primary
                    borderRadius: "0",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                width: "60px",
                height: "60px",
                background: "oklch(0.2161 0.0061 56.0434)", // --primary
                borderRadius: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "4px 4px 0px 0px oklch(0 0% 10.1961% / 1.00)", // --shadow
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "oklch(0.9761 0 0)", // --background
                  borderRadius: "0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "20px",
                    height: "20px",
                    background: "oklch(0.2161 0.0061 56.0434)", // --primary
                    borderRadius: "0",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "900",
              color: "oklch(0.2161 0.0061 56.0434)", // --foreground
              margin: "0 0 20px 0",
              lineHeight: 1,
              letterSpacing: "0.05em", // --tracking-normal
            }}
          >
            TURN SIGNAL
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "oklch(0.5534 0.0116 58.0708)", // --muted-foreground
              margin: "0 0 40px 0",
              letterSpacing: "0.05em", // --tracking-normal
            }}
          >
            Transform GitHub Issues into Beautiful Public Roadmaps
          </p>

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "oklch(0.9729 0.0693 103.1933)", // --accent
                padding: "12px 20px",
                borderRadius: "0", // --radius
                fontSize: "18px",
                fontWeight: "600",
                color: "oklch(0.2161 0.0061 56.0434)", // --accent-foreground
                border: "2px solid oklch(0.2161 0.0061 56.0434)", // --border
                boxShadow: "4px 4px 0px 0px oklch(0 0% 10.1961% / 1.00)", // --shadow
              }}
            >
              🚀 Free & Open Source
            </div>
            <div
              style={{
                background: "oklch(0.9729 0.0693 103.1933)", // --accent
                padding: "12px 20px",
                borderRadius: "0",
                fontSize: "18px",
                fontWeight: "600",
                color: "oklch(0.2161 0.0061 56.0434)", // --accent-foreground
                border: "2px solid oklch(0.2161 0.0061 56.0434)", // --border
                boxShadow: "4px 4px 0px 0px oklch(0 0% 10.1961% / 1.00)", // --shadow
              }}
            >
              🔗 GitHub Integration
            </div>
            <div
              style={{
                background: "oklch(0.9729 0.0693 103.1933)", // --accent
                padding: "12px 20px",
                borderRadius: "0",
                fontSize: "18px",
                fontWeight: "600",
                color: "oklch(0.2161 0.0061 56.0434)", // --accent-foreground
                border: "2px solid oklch(0.2161 0.0061 56.0434)", // --border
                boxShadow: "4px 4px 0px 0px oklch(0 0% 10.1961% / 1.00)", // --shadow
              }}
            >
              👥 User Engagement
            </div>
            <div
              style={{
                background: "oklch(0.9729 0.0693 103.1933)", // --accent
                padding: "12px 20px",
                borderRadius: "0",
                fontSize: "18px",
                fontWeight: "600",
                color: "oklch(0.2161 0.0061 56.0434)", // --accent-foreground
                border: "2px solid oklch(0.2161 0.0061 56.0434)", // --border
                boxShadow: "4px 4px 0px 0px oklch(0 0% 10.1961% / 1.00)", // --shadow
              }}
            >
              ⚡ Real-time Updates
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "oklch(0.2161 0.0061 56.0434)", // --primary
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
