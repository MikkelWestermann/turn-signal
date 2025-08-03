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
          background: "#f9f9f9",
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          }}
        />

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
                background: "#373737",
                borderRadius: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "4px 4px 0px 0px rgba(26, 26, 26, 1.00)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#f9f9f9",
                  borderRadius: "0",
                  position: "relative",
                  display: "flex",
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
                    background: "#373737",
                    borderRadius: "0",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                width: "60px",
                height: "60px",
                background: "#373737",
                borderRadius: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "4px 4px 0px 0px rgba(26, 26, 26, 1.00)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#f9f9f9",
                  borderRadius: "0",
                  position: "relative",
                  display: "flex",
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
                    background: "#373737",
                    borderRadius: "0",
                  }}
                />
              </div>
            </div>
          </div>

          <h1
            style={{
              fontSize: "72px",
              fontWeight: "900",
              color: "#373737",
              margin: "0 0 20px 0",
              lineHeight: 1,
              letterSpacing: "0.05em",
            }}
          >
            TURN SIGNAL
          </h1>

          <p
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#8d8d8d",
              margin: "0 0 40px 0",
              letterSpacing: "0.05em",
            }}
          >
            Transform GitHub Issues into Beautiful Public Roadmaps
          </p>

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
                background: "#f8f9fa",
                padding: "12px 20px",
                borderRadius: "0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#373737",
                border: "2px solid #373737",
                boxShadow: "4px 4px 0px 0px rgba(26, 26, 26, 1.00)",
              }}
            >
              🚀 Free & Open Source
            </div>
            <div
              style={{
                background: "#f8f9fa",
                padding: "12px 20px",
                borderRadius: "0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#373737",
                border: "2px solid #373737",
                boxShadow: "4px 4px 0px 0px rgba(26, 26, 26, 1.00)",
              }}
            >
              🔗 GitHub Integration
            </div>
            <div
              style={{
                background: "#f8f9fa",
                padding: "12px 20px",
                borderRadius: "0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#373737",
                border: "2px solid #373737",
                boxShadow: "4px 4px 0px 0px rgba(26, 26, 26, 1.00)",
              }}
            >
              👥 User Engagement
            </div>
            <div
              style={{
                background: "#f8f9fa",
                padding: "12px 20px",
                borderRadius: "0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#373737",
                border: "2px solid #373737",
                boxShadow: "4px 4px 0px 0px rgba(26, 26, 26, 1.00)",
              }}
            >
              ⚡ Real-time Updates
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#373737",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
