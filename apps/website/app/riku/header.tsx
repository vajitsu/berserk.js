import styles from "./header.module.css";
import classNames from "classnames";

import localFont from "@next/font/local";
const jost = localFont({ src: "../fonts/jost/700.ttf" });

export default function RikuHome_Header() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={classNames(styles.nav_first, jost.className)}>RIKU</div>
      </header>
    </div>
  );
}
