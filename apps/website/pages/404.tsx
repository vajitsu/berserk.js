"use client";

import { useRouter } from "next/router";

import "@/styles/globals.css";

import styles from "@/styles/404.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";

import Button from "@/ui/Button";

import { Inter, Noto_Sans_Mono } from "@next/font/google";
const inter = Inter();
const notoSansMono = Noto_Sans_Mono();

export default function notFound() {
  const router = useRouter();

  const [pathname, setPathname] = useState("Unknown");
  useEffect(() => setPathname(router.asPath));

  return (
    <>
      <div className={classNames(inter.className, styles.screen)}>
        <div className={styles.wrapper}>
          <span className={styles.header}>Page not found.</span>
          <Button to="/" small={true} invert={true}>
            Go Home
          </Button>
        </div>
      </div>
      <div className={styles.attempted_page}>
        Attempted to reach{" "}
        <span className={notoSansMono.className}>{pathname}</span>
      </div>
    </>
  );
}
