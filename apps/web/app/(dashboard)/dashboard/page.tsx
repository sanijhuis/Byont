"use client";

import BasicLink from "../../../components/button/basic-link";
import H2 from "../../../components/text/H2";
import Paragraph from "../../../components/text/paragraph";
import CardOutline from "../../../components/ui/card/card-outline";
import CardRepo from "@/components/dashboard/card-repo";
import ListRepoActive from "@/components/dashboard/list-repo-active";
import { cn } from "@/lib/merge-tailwind";
import clsx from "clsx";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [grid, setGrid] = useState<boolean>(true);

  return (
    <section className="min-h-screen bg-[#111] py-3">
      <div className="container flex">
        <nav className="ml-auto flex gap-1">
          <menu className="flex h-[44px] flex-row items-center gap-[5px] rounded-md border-[1px] border-green/20 bg-black p-[5px]">
            <button
              className={clsx("h-full rounded-sm px-[5px]", {
                " bg-white/20": grid,
              })}
              onClick={() => setGrid(true)}
            >
              <LayoutGrid size={20} color="#8c8c8c" />
            </button>
            <button
              className={clsx("h-full rounded-sm px-[5px]", {
                " bg-white/20": !grid,
              })}
              onClick={() => setGrid(false)}
            >
              <List size={20} color="#8c8c8c" />
            </button>
          </menu>
          <BasicLink href="/dashboard/new">Add new...</BasicLink>
        </nav>
      </div>
      <div
        className={cn("container grid gap-3 pt-5", {
          "grid-cols-3": grid,
          "grid-cols-1": !grid,
        })}
      >
        <ListRepoActive grid={grid} />
      </div>
    </section>
  );
};

export default Page;
