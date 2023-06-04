"use client";

import contract from "@/lib/get-contract";
import React, { useEffect, useState } from "react";

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
  console.log(nfts);
  return (
    <div className="text-white">
      {nfts.map((nft, index) => (
        <p key={index}>{nft}</p>
      ))}
    </div>
  );
};

export default ViewNFTComponent;
