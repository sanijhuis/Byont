"use client";

import styles from "./button.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useRef, useState } from "react";

interface ButtonAnimationProps {
  url: string;
  children: React.ReactNode;
  className?: string;
  color: "primary" | "secondary";
}

export default function ButtonAnimation({
  url,
  children,
  className,
  color,
}: ButtonAnimationProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [styling, setStyling] = useState({});

  const mouseHover = (e: any) => {
    if (btnRef.current) {
      const circleDiameter = Math.max(
        btnRef.current.clientWidth,
        btnRef.current.clientHeight
      );
      const circleWidthAndHeight = "150px";
      const circleRadius = circleDiameter / 2;
      const rect = btnRef?.current?.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStyling({
        top: `${y - circleRadius}px`,
        left: `${x - circleRadius}px`,
        height: circleWidthAndHeight,
        width: circleWidthAndHeight,
        opacity: 0.5,
        position: "absolute",
      });
    }
  };

  return (
    <Link
      ref={btnRef}
      onMouseEnter={e => mouseHover(e)}
      onMouseLeave={() => setStyling({})}
      className={clsx(className, {
        [styles.link_primary]: color === "primary",
        [styles.link_secondary]: color === "secondary",
      })}
      href={url}
    >
      {children}
      <span style={styling}></span>
    </Link>
  );
}
