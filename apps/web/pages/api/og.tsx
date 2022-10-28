import { ImageResponse } from "@vercel/og";
export const config = {
  runtime: "experimental-edge",
};

const inter_regularFont = fetch(
  new URL(`https://web-opal-sigma.vercel.app/fonts/inter/regular.ttf`)
).then((res) => res.arrayBuffer());
const inter_boldFont = fetch(
  new URL(`https://web-opal-sigma.vercel.app/fonts/inter/bold.ttf`)
).then((res) => res.arrayBuffer());

const nsm_regularFont = fetch(
  new URL(`https://web-opal-sigma.vercel.app/fonts/noto_sans_mono/regular.ttf`)
).then((res) => res.arrayBuffer());
const nsm_boldFont = fetch(
  new URL(`https://web-opal-sigma.vercel.app/fonts/noto_sans_mono/bold.ttf`)
).then((res) => res.arrayBuffer());

export default async function () {
  const inter_NORMAL = await inter_regularFont;
  const inter_BOLD = await inter_boldFont;

  const nsm_NORMAL = await nsm_regularFont;
  const nsm_BOLD = await nsm_boldFont;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#fff",
          fontSize: "42px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", fontSize: "72px", fontWeight: 800 }}>
          Welcome to{" "}
          <span style={{ color: "#456ef6", marginLeft: "17px" }}>Riku.js!</span>
        </div>
        <div
          style={{
            fontWeight: 400,
            display: "flex",
            margin: "2rem 0",
            lineHeight: "1.5",
            textAlign: "center",
            fontSize: "30px"
          }}
        >
          Get started by editing
          <span
            style={{
              marginLeft: 7.3,
              fontWeight: 400,
              fontFamily: "Noto Sans Mono",
              paddingBlock: "4rem",
              backgroundColor: "#1d1d1f",
              borderRadius: "5px",
              padding: "0.5rem",
              paddingTop: "1.1rem",
              paddingBottom: "1.1rem",
              fontSize: "29px",
              marginTop: -16,
            }}
          >
            index.ts
          </span>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: "Inter",
          data: inter_NORMAL,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: inter_BOLD,
          weight: 800,
        },
        {
          name: "Noto Sans Mono",
          data: nsm_NORMAL,
          style: "normal",
          weight: 400,
        },
        {
          name: "Noto Sans Mono",
          data: nsm_BOLD,
          weight: 800,
        },
      ],
    }
  );
}
