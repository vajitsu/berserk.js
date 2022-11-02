import classNames from "classnames";
import styles from "./page.module.css";

import localFont from "@next/font/local";
const oldlondon = localFont({ src: "./fonts/old_london/main.ttf" });

import { Noto_Serif } from "@next/font/google";
const notoSerif = Noto_Serif({
  weight: "700",
});

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <div className={classNames(styles.header, oldlondon.className)}>
        vajitsu
      </div>
      <div className={styles.nav}>
        <div className={classNames(styles.navItem, notoSerif.className)}>
          <a href="/riku" className={styles.navItem_a}>
            RIKU
          </a>
        </div>
      </div>
    </main>
    // {/* <footer className={styles.footer}>
    //   <a
    //     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Powered by{" "}
    //     <span className={styles.logo}>
    //       <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    //     </span>
    //   </a>
    // </footer> */}
  );
}
