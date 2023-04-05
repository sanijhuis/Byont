"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react"
import { AiOutlineInfoCircle } from 'react-icons/ai'
import InfoTabs from "./infoTabs";
import Paragraph from "../../components/paragraph";
import clsx from "clsx";
function Scanners() {


  const [scanners, setScanners] = useState([
    {
      logo: require(`./assets/manticore.png`),
      level: "Thorough",
      title: "Manticore",
      selected: false,
      infoOpen: false
    },
    {
      logo: require(`./assets/mythril.png`),
      level: "Consistent",
      title: "Mythril",
      selected: false,
      infoOpen: false
    },
    {
      logo: require(`./assets/securify.png`),
      level: "balanced",
      title: "Security",
      selected: false,
      infoOpen: false
    },
    {
      logo: require(`./assets/Slither.png`),
      level: "very fast",
      title: "Slither",
      selected: false,
      infoOpen: false
    }
  ]);

  const handleCheckboxChange = (index: number) => {
    const newScanners = [...scanners];
    newScanners[index].selected = !newScanners[index].selected;
    setScanners(newScanners);
  };



  return (
    <section className="py-10 bg-zinc-800 relative p-2">
      <div className="mt-8 text-gray-100 text-center">
        <h3 className="text-white text-2xl ">Select scanners</h3>
        <div className="flex items-center justify-center mt-12 gap-10 flex-wrap">
          {scanners?.map((scanner, i) => (
            <div
              key={i}
              className={`border-2 relative min-w-[10rem] max-w-[16rem] bg-zinc-900 p-8 rounded-xl cursor-pointer ${scanner.selected == true ? 'border-lime-400' : 'border-red-600'}`}
            >
              <div className="absolute top-2 left-40">
                <AiOutlineInfoCircle className="text-2xl"/>
              </div>
              <InfoTabs title='test' info='test' />
              <div onClick={() => handleCheckboxChange(i)}>
              <div
                className="w-32 h-32 flex items-center justify-center rounded-full"
              >
                <div className="text-6xl w-28 h-28 rounded-full flex items-center justify-center">
                  <Image src={scanner.logo} alt="test"></Image>
                </div>
              </div>
              <Paragraph size="md" color="black" fontWeight="light" className={clsx("mt=3", {
                "text-lime-400":scanner.selected === true,
                "text-red-600":scanner.selected === false,
              })}>Test</Paragraph>
              <input type="checkbox" checked={scanner.selected} onChange={() => handleCheckboxChange(i)} className="cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Scanners;
