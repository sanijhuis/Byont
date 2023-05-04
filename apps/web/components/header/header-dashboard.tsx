"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type HeaderDashboardProps = React.ComponentProps<"div"> & {};

let tabs = [
  { id: "/dashboard", label: "Dashboard" },
  { id: "/dashboard/new", label: "Add new" },
  { id: "Information", label: "Information" },
];

type tabs = {
  id: string;
  label: string;
};

export default function HeaderDashboard({}: HeaderDashboardProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-6 h-5 w-screen gap-2 bg-black">
      <nav className="container flex h-full w-full items-center">
        {tabs.map((tab: tabs) => (
          <Link
            href={tab.id}
            key={tab.id}
            className={`${
              pathname === tab.id ? "" : "hover:text-white/60"
            } relative rounded-md px-2 py-[5px] text-[14px] font-normal text-white outline-sky-400 transition focus-visible:outline-2`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {pathname === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-white mix-blend-difference"
                style={{ borderRadius: 10 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
