"use client";

import { cn } from "@/lib/merge-tailwind";
import fetchWithCredentials from "@/utils/fetchWithCredentials";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type HeaderDashboardProps = React.ComponentProps<"div"> & {};

type tabs = {
  id: string;
  label: string;
};

let tabs = [
  { id: "/dashboard", label: "Dashboard" },
  { id: "/dashboard/new", label: "Add new" },
  { id: "/dashboard/single", label: "Single file" },
] as tabs[];

const HeaderDashboard = ({}: HeaderDashboardProps) => {
  let [activeTab, setActiveTab] = useState<string | undefined>();
  const pathname = usePathname();

  console.log(pathname);
  return (
    <div className="sticky top-6 z-10 h-5 w-screen  gap-2 bg-black">
      <nav className="container grid h-full w-full grid-cols-2 items-center">
        <div className="col-span-1">
          {tabs.map((tab: tabs) => (
            <Link
              href={tab.id}
              key={tab.id}
              onMouseEnter={() => setActiveTab(tab.id)}
              onMouseLeave={() => setActiveTab(undefined)}
              className={cn(
                "relative rounded-md px-2 py-[5px] text-[14px] font-normal text-white outline-sky-400 transition focus-visible:outline-2",
                {
                  "hover:text-white/60": activeTab === tab.id,
                }
              )}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white mix-blend-difference "
                  style={{ borderRadius: 10 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
              {pathname === tab.id && (
                <div className="absolute bottom-[-9px] left-0 right-0 h-[2px] w-full bg-white/60"></div>
              )}
            </Link>
          ))}
        </div>
        <div className="col-span-1 flex  text-white">
          <button
            onClick={async () => {
              fetchWithCredentials("http://localhost:3000/auth/logout", {
                method: "POST",
              });
              window.location.href = "/";
            }}
            className="ml-auto rounded-md bg-white px-1 py-[4px] text-black"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HeaderDashboard;
