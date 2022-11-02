import styles from "@/styles/Riku/Header.module.css";
import classNames from "classnames";

import localFont from "@next/font/local";
const nevis = localFont({ src: "../../app/fonts/nevis/bold.ttf" });

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
            <button className={classNames(styles.logo, nevis.className)}>
              <span
                className={classNames(
                  styles.button_content,
                  styles.button_center,
                  nevis.className,
                  nevis.className
                )}
              >
                RIKU
              </span>
            </button>
          </div>
        </div>
        <div className={classNames(styles.nav_second, "visually-hidden")}>
          <ul className={classNames(styles.nav, styles.left, styles.visible)}>
            {/* <li>
              <Link
                to={"/riku/docs"}
                className={styles.link_padding}
                secondary={true}
              >
                Docs
              </Link>
            </li> */}
          </ul>
        </div>
        <div
          className={classNames(styles.nav_third, "visually-hidden")}
          style={{ opacity: 0, pointerEvents: "none" }}
        ></div>
      </header>
    </div>
  );
}
