"use client";

import styles from "@/styles/Button.module.css";
import classNames from "classnames";

export default function Button({
  small = false,
  invert = false,
  to,
  children,
}: {
  small?: boolean;
  invert?: boolean;
  to: string;
  children: React.ReactNode;
}) {
  const className = [styles.button, styles.base, styles.reset];
  if (small) className.push(styles.small);
  if (invert) className.push(styles.invert);

  return (
    <a href={to} className={classNames(className)}>
      {children}
    </a>
  );
}
