"use client";
import Image from "next/image";
import React from "react";

function Scanners() {
  const scanners = [
    {
      logo: require(`./assets/manticore.png`),
      level: "Thorough",
      title: "Manticore"
    },
    {
      logo: require(`./assets/mythril.png`),
      level: "Consistent",
      title: "Mythril"
    },
    {
      logo: require(`./assets/securify.png`),
      level: "balanced",
      title: "Security"
    },
    {
      logo: require(`./assets/Slither.png`),
      level: "very fast",
      title: "Slither"
    },
  ];
  return (
    <section className="py-10 bg-zinc-800 relative p-2">
      <div className="mt-8 text-gray-100 text-center">
        <h3 className="text-white text-2xl ">Scanners available</h3>
        <div className="flex items-center justify-center mt-12 gap-10 flex-wrap">
          {scanners?.map((scanner, i) => (
            <div
              key={i}
              className="border-2 group border-lime-500 relative min-w-[10rem] max-w-[16rem] bg-zinc-900 p-10 rounded-xl"
            >
              <div
                className="w-32 h-32 flex items-center justify-center rounded-full"
              >
                <div className="text-6xl w-28 h-28 rounded-full flex items-center justify-center">
                  <Image src={scanner.logo} alt="test"></Image>
                </div>
              </div>
              <p className="text-sm mt-3 group-hover:text-lime-400">{scanner.title}</p>
              <p className="text-xl mt group-hover:text-lime-400">{scanner.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Scanners;
