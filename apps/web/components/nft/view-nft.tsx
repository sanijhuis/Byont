"use client";

import styling from "./nft.module.scss";
import contract from "@/lib/get-contract";
import { cn } from "@/lib/merge-tailwind";
import React, { useEffect, useState } from "react";

declare var window: any;

const ViewNFTComponent = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    async function onInit() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // Ensure you're setting account to the first item in accounts array
      const account = accounts[0];
      setAccount(account);
      console.log(account);
    }
    // Call onInit to request account and set state
    onInit();
  }, []); // Only run this once after component mounts

  useEffect(() => {
    async function fetchNFTs() {
      if (account) {
        const nftData = await contract.methods
          .getMyNFTsData()
          .call({ from: account });
        setNfts(nftData);
      }
    }
    fetchNFTs();
  }, [account]);

  return (
    <div className="container my-6 grid grid-cols-3 gap-6 text-white">
      {nfts
        .slice()
        .reverse()
        .map((nft, index) => (
          <div className="col-span-1 flex flex-col" key={index}>
            <div
              className={cn("w-fit", styling.svg_inner)}
              dangerouslySetInnerHTML={{ __html: nft[3] }}
            />
            <p className="mx-auto mt-1 font-medium underline underline-offset-4 ">
              <a className="mt-2 text-20" href={nft[2]}>
                {nft[1]}
              </a>
            </p>
          </div>
        ))}
    </div>
  );
};

export default ViewNFTComponent;
