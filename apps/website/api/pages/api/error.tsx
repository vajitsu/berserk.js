import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const bold_font = fetch(
  "https://rsms.me/inter/font-files/Inter-Bold.otf?v=3.19"
).then((res) => res.arrayBuffer());

const font = fetch(
  "https://rsms.me/inter/font-files/Inter-Regular.otf?v=3.19"
).then((res) => res.arrayBuffer());

export default async function (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const bold_fontData = await bold_font;
    const fontData = await font;

    // ?message=<message>
    const hasMessage = searchParams.has("message");
    const message = hasMessage
      ? searchParams.get("message")?.slice(0, 100)
      : "No message found.";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            fontFamily: "Inter var",
          }}
        >
          <div
            style={{
              fontSize: 70,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "white",
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            Command Error
          </div>
          <div
            style={{
              fontSize: 35,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "#EAEAEA",
              marginTop: 8,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </div>
        </div>
      ),
      {
        width: 760,
        height: 400,
        fonts: [
          {
            name: "Inter",
            data: bold_fontData,
            style: "normal",
            weight: 700,
          },
          {
            name: "Inter",
            data: fontData,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
