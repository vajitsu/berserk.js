import styles from "@/styles/Riku/Header.module.css";
import classNames from "classnames";

import localFont from "@next/font/local";
const jost = localFont({ src: "../../app/fonts/jost/700.ttf" });
const nevis = localFont({ src: "../../app/fonts/nevis/bold.ttf" });
const oldlondon = localFont({ src: "../../app/fonts/old_london/main.ttf" });

import Image from "next/image";

import Link from "../Link";

export default function Header() {
  //     {
  //   links,
  // }: {
  //   links: Array<{
  //     name: string;
  //     value: string;
  //     disabled?: boolean;
  //   }>;
  //     }
  return (
    <div className={classNames(styles.wrapper)}>
      <header className={classNames(styles.header)}>
        <div className={styles.nav_first}>
          <div>
            <button className={classNames(styles.logo, jost.className)}>
              <span
                className={classNames(
                  styles.button_content,
                  styles.button_center,
                  nevis.className
                )}
              >
                RIKU
              </span>
            </button>
          </div>
        </div>
        <div className={styles.nav_second}>
          <ul className={classNames(styles.nav, styles.left, styles.visible)}>
            <li>
              <Link
                to={"/riku/docs"}
                className={styles.link_padding}
                secondary={true}
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                to={"/riku/docs"}
                className={styles.link_padding}
                secondary={true}
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={classNames(styles.nav_third)}
          style={{ opacity: 0, pointerEvents: "none" }}
        ></div>
      </header>
    </div>
  );
}
