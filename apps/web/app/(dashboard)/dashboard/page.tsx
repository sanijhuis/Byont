"use client";

import BasicLink from "../../../components/button/basic-link";
import H2 from "../../../components/text/H2";
import Paragraph from "../../../components/text/paragraph";
import CardOutline from "../../../components/ui/card/card-outline";
import clsx from "clsx";
import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [grid, setGrid] = useState<boolean>(true);

  return (
    <section className="bg-[#111] py-3">
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
        className={clsx("container grid gap-5 pt-3", {
          "grid-cols-3": grid,
          "grid-cols-1": !grid,
        })}
      >
        <CardOutline className="col-span-1">
          <Link href="/">
            <div
              className={clsx("grid", {
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
                Card 1
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
      </div>
    </section>
  );
};

export default Page;
