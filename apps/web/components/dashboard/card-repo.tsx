"use client";

import Paragraph from "../text/paragraph";
import CardOutline from "../ui/card/card-outline";
import { cn } from "@/lib/merge-tailwind";
import clsx from "clsx";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { MouseEvent, useState } from "react";

type CardRepoProps = React.ComponentProps<"article"> & {
  grid: boolean;
  title: string;
};

const CardRepo = ({ grid, title, ...props }: CardRepoProps) => {
  const [mouseHover, setMouseHover] = useState({
    mouseX: useMotionValue(0),
    mouseY: useMotionValue(0),
  });

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseHover.mouseX.set(clientX - left);
    mouseHover.mouseY.set(clientY - top);
  };

  const { mouseX, mouseY } = mouseHover;
  return (
    <article className="col-span-1" {...props}>
      <CardOutline className="group relative col-span-1 ">
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
            radial-gradient(
              550px circle at ${mouseX ? mouseX : 0}px ${mouseY ? mouseY : 0}px,
              rgba(255,255,255, 0.05),
              transparent 80%
            )
          `,
          }}
        />
        <Link href={`/dashboard/repository/${title}`}>
          <div
            onMouseMove={handleMouseMove}
            className={cn("group grid", {
              " grid h-[200px] grid-cols-1 p-2": grid,
              " grid h-[150px] grid-cols-2 p-2": !grid,
            })}
          >
            <Paragraph
              className="col-span-1"
              color="white"
              size="lg"
              fontWeight="medium"
            >
              {title}
            </Paragraph>
            <Paragraph
              className="col-span-1 opacity-80"
              color="white"
              size="sm"
              fontWeight="medium"
            >
              Card 1fs
            </Paragraph>
            <Paragraph
              className="flex-end col-span-1 mt-auto flex flex-col opacity-80"
              color="white"
              size="sm"
              fontWeight="medium"
            >
              Card 1asfd
            </Paragraph>
          </div>
        </Link>
      </CardOutline>
    </article>
  );
};

export default CardRepo;
