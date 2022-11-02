import styles from "@/styles/Riku/Hero.module.css";
import classNames from "classnames"

import localFont from "@next/font/local";
const nevis = localFont({ src: "../../app/fonts/nevis/bold.ttf" });

import { Noto_Sans_Mono } from "@next/font/google";
const notoSansMono = Noto_Sans_Mono();

export default function Hero() {
  return (
    <>
      <div className={styles.root}>
        {/* <img
          alt="A black and white theme featuring an image of light rays exiting a prism in 3 directions. The light rays are not vertical but leave the prism at various angles, creating a dynamic composition."
          srcSet="https://vercel.com/_next/image?url=%2Fstatic%2Fconf-22%2Fprism-dark.jpg&amp;w=1080&amp;q=100 1x, /_next/image?url=%2Fstatic%2Fconf-22%2Fprism-dark.jpg&amp;w=1920&amp;q=100 2x"
          src="https://vercel.com/_next/image?url=%2Fstatic%2Fconf-22%2Fprism-dark.jpg&amp;w=1920&amp;q=100"
          decoding="async"
          data-nimg="future"
          className={styles.prismDark}
          loading="lazy"
          style={{ color: "transparent" }}
          width="900"
          height="900"
        ></img> */}
        <div className={styles.meta}>
          {/* <div className={styles.conf_logo}>
            <svg
              aria-labelledby="conf-logo-title-post-conf-logo"
              fill="none"
              role="img"
              viewBox="0 0 172 26"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title id="conf-logo-title-post-conf-logo">
                The logo for Next.js Conference. Next is all uppercase in a
                heavy, angular font, with the upstroke of the N elided into the
                E and a slight cut where the bottom-left leg joins the X. .JS is
                also all uppercase, styled almost as subscript, but still aligns
                with the bottom of Next. Conf is uppercase as well, bordered top
                and bottom with horizontal white lines that align with the top
                and bottom of Next.
              </title>
              <path
                d="M108.262 25.9669C108.032 25.9669 107.836 25.8884 107.672 25.7313C107.508 25.5742 107.427 25.3841 107.43 25.1588C107.427 24.9397 107.508 24.7516 107.672 24.5945C107.836 24.4374 108.032 24.3589 108.262 24.3589C108.483 24.3589 108.677 24.4374 108.841 24.5945C109.007 24.7516 109.09 24.9397 109.092 25.1588C109.09 25.3076 109.052 25.444 108.975 25.566C108.896 25.69 108.796 25.7871 108.671 25.8574C108.547 25.9297 108.411 25.9669 108.262 25.9669Z"
                fill="currentColor"
              ></path>
              <path
                d="M113.624 18.3689H115.016V23.654C115.014 24.1398 114.907 24.5552 114.699 24.9045C114.488 25.2538 114.196 25.5205 113.822 25.7086C113.449 25.8946 113.013 25.9897 112.517 25.9897C112.064 25.9897 111.657 25.9091 111.295 25.752C110.933 25.5949 110.646 25.3593 110.435 25.0492C110.222 24.7392 110.118 24.3527 110.118 23.8897H111.512C111.514 24.0922 111.561 24.2679 111.651 24.4147C111.74 24.5614 111.864 24.673 112.021 24.7516C112.181 24.8301 112.364 24.8694 112.57 24.8694C112.794 24.8694 112.985 24.8239 113.141 24.7309C113.296 24.64 113.415 24.5035 113.498 24.3217C113.579 24.1418 113.622 23.9186 113.624 23.654V18.3689Z"
                fill="currentColor"
              ></path>
              <path
                d="M120.744 20.4358C120.71 20.1155 120.561 19.8654 120.301 19.6876C120.039 19.5078 119.701 19.4189 119.286 19.4189C118.994 19.4189 118.743 19.4623 118.535 19.5471C118.326 19.6339 118.164 19.7496 118.053 19.8964C117.943 20.0431 117.887 20.2106 117.883 20.3986C117.883 20.5557 117.921 20.6921 117.996 20.8058C118.07 20.9216 118.171 21.0187 118.3 21.0973C118.428 21.1779 118.571 21.244 118.726 21.2977C118.884 21.3515 119.041 21.397 119.199 21.4342L119.925 21.6099C120.216 21.676 120.499 21.7649 120.77 21.8786C121.04 21.9902 121.285 22.1328 121.5 22.3043C121.715 22.4759 121.885 22.6826 122.011 22.9244C122.136 23.1662 122.2 23.4494 122.2 23.776C122.2 24.2162 122.085 24.6028 121.853 24.9376C121.621 25.2704 121.287 25.5308 120.848 25.7189C120.412 25.9049 119.884 26 119.263 26C118.662 26 118.139 25.9091 117.698 25.7272C117.255 25.5474 116.91 25.2828 116.661 24.9355C116.412 24.5883 116.278 24.1646 116.259 23.6664H117.638C117.658 23.9269 117.743 24.1439 117.887 24.3196C118.034 24.4932 118.226 24.6214 118.46 24.7082C118.696 24.7929 118.96 24.8363 119.252 24.8363C119.556 24.8363 119.824 24.7908 120.056 24.702C120.286 24.6131 120.467 24.4891 120.597 24.3279C120.729 24.1687 120.795 23.9806 120.797 23.7657C120.795 23.5693 120.736 23.406 120.621 23.2779C120.504 23.1497 120.342 23.0422 120.135 22.9554C119.927 22.8686 119.684 22.7901 119.407 22.7219L118.526 22.5028C117.89 22.3436 117.385 22.1018 117.017 21.7773C116.646 21.4528 116.463 21.0229 116.463 20.4834C116.463 20.0411 116.587 19.6525 116.836 19.3197C117.083 18.9869 117.421 18.7286 117.849 18.5446C118.279 18.3586 118.764 18.2676 119.305 18.2676C119.854 18.2676 120.335 18.3586 120.75 18.5446C121.165 18.7286 121.491 18.9849 121.727 19.3114C121.964 19.638 122.087 20.0121 122.094 20.4358H120.744Z"
                fill="currentColor"
              ></path>
              <path
                d="M85.1237 0.0107485H107.428V4.1275H98.5798V25.7852H94.1559V4.1275H85.1237V0.0107485Z"
                fill="currentColor"
              ></path>
              <path
                d="M48.4419 0.0107485V4.1275H30.5637V10.7501H44.9415V14.8668H30.5637V21.6684H48.4419V25.7852H26.1397V4.1275H26.1379V0.0107485H48.4419Z"
                fill="currentColor"
              ></path>
              <path
                d="M59.5792 0.0214983H53.7893L74.5265 25.7959H80.3329L69.9632 12.9176L80.3163 0.0411626L74.5265 0.0501099L67.0645 9.31767L59.5792 0.0214983Z"
                fill="currentColor"
              ></path>
              <path
                d="M65.5201 18.4323L62.6206 14.8275L53.7727 25.8156H59.5791L65.5201 18.4323Z"
                fill="currentColor"
              ></path>
              <path
                clipRule="evenodd"
                d="M26.2948 25.7852L5.52992 0H0V25.7744H4.42393V5.50928L20.7372 25.7852H26.2948Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
              <path
                d="M137.405 16.3464C137.8 16.3464 138.122 16.2892 138.372 16.1748C138.632 16.05 138.83 15.8888 138.965 15.6912C139.11 15.4832 139.209 15.2492 139.261 14.9892C139.313 14.7188 139.339 14.4432 139.339 14.1624V13.8816H141.398V14.1624C141.398 15.4624 141.055 16.466 140.369 17.1732C139.693 17.87 138.705 18.2184 137.405 18.2184C136.157 18.2184 135.169 17.8388 134.441 17.0796C133.713 16.3204 133.349 15.2128 133.349 13.7568V11.3232C133.349 10.6264 133.442 10.0024 133.63 9.4512C133.817 8.8896 134.087 8.4216 134.441 8.0472C134.794 7.6624 135.221 7.3712 135.72 7.1736C136.219 6.9656 136.781 6.8616 137.405 6.8616C138.05 6.8616 138.622 6.9552 139.121 7.1424C139.62 7.3296 140.036 7.6 140.369 7.9536C140.712 8.3072 140.967 8.7336 141.133 9.2328C141.31 9.732 141.398 10.2936 141.398 10.9176V11.1984H139.339V10.9176C139.339 10.6576 139.308 10.3976 139.246 10.1376C139.183 9.8776 139.079 9.6436 138.934 9.4356C138.788 9.2276 138.59 9.0612 138.341 8.9364C138.091 8.8012 137.779 8.7336 137.405 8.7336C137.062 8.7336 136.765 8.8012 136.516 8.9364C136.266 9.0612 136.058 9.238 135.892 9.4668C135.725 9.6852 135.6 9.9452 135.517 10.2468C135.444 10.538 135.408 10.8448 135.408 11.1672V13.9128C135.408 14.2664 135.444 14.594 135.517 14.8956C135.59 15.1868 135.704 15.4416 135.86 15.66C136.016 15.8784 136.219 16.05 136.469 16.1748C136.729 16.2892 137.041 16.3464 137.405 16.3464ZM142.745 11.3232C142.745 9.9088 143.098 8.8116 143.806 8.0316C144.523 7.2516 145.511 6.8616 146.77 6.8616C148.028 6.8616 149.011 7.2516 149.718 8.0316C150.436 8.8116 150.794 9.9088 150.794 11.3232V13.7568C150.794 15.2128 150.436 16.3204 149.718 17.0796C149.011 17.8388 148.028 18.2184 146.77 18.2184C145.511 18.2184 144.523 17.8388 143.806 17.0796C143.098 16.3204 142.745 15.2128 142.745 13.7568V11.3232ZM146.77 16.3464C147.144 16.3464 147.456 16.2892 147.706 16.1748C147.955 16.05 148.158 15.8784 148.314 15.66C148.47 15.4416 148.579 15.1816 148.642 14.88C148.704 14.5784 148.735 14.2456 148.735 13.8816V11.1984C148.735 10.8552 148.699 10.5328 148.626 10.2312C148.553 9.9296 148.439 9.6696 148.283 9.4512C148.127 9.2328 147.924 9.0612 147.674 8.9364C147.425 8.8012 147.123 8.7336 146.77 8.7336C146.416 8.7336 146.114 8.8012 145.865 8.9364C145.615 9.0612 145.412 9.2328 145.256 9.4512C145.1 9.6696 144.986 9.9296 144.913 10.2312C144.84 10.5328 144.804 10.8552 144.804 11.1984V13.8816C144.804 14.2456 144.835 14.5784 144.898 14.88C144.96 15.1816 145.069 15.4416 145.225 15.66C145.381 15.8784 145.584 16.05 145.834 16.1748C146.083 16.2892 146.395 16.3464 146.77 16.3464ZM157.648 16.9704H157.928V7.08H159.988V18H155.963L154.684 8.1096H154.403V18H152.344V7.08H156.368L157.648 16.9704ZM162.161 7.08H169.15V9.0456H164.22V11.5416H169.056V13.5072H164.22V18H162.161V7.08Z"
                fill="currentColor"
              ></path>
              <line
                stroke="currentColor"
                strokeWidth={1.3}
                x1="132.6"
                x2="171.6"
                y1="25.35"
                y2="25.35"
              ></line>
              <line
                stroke="currentColor"
                strokeWidth={1.3}
                x1="132.6"
                x2="171.6"
                y1="0.65"
                y2="0.65"
              ></line>
            </svg>
          </div> */}
          <h1>Innovation without limits</h1>
          <p
            className={classNames(
              styles.text_wrapper,
              styles.text_s_20,
              styles.text_w_400,
              styles.text_lh_32,
              notoSansMono.className
            )}
          >
            Ship your Discord bots in <strong>seconds</strong>.
          </p>
        </div>
      </div>
      <div aria-hidden="true" className={styles.fade}></div>
    </>
  );
}
