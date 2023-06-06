"use client";

import { useToast } from "../ui/toaster/use-toast";
import contract from "@/lib/get-contract";
import { create } from "ipfs-http-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Web3 from "web3";

type FormData = {
  nameOutput: any;
  jsonOutput: any;
  date: any;
  level: any;
};

declare var window: any;

const MintNFTComponent = ({
  nameOutput,
  jsonOutput,
  date,
  level,
}: FormData) => {
  const [name, setName] = useState(nameOutput);
  const [json, setJson] = useState(jsonOutput);
  const { toast } = useToast();
  const router = useRouter();

  console.log(name, json);

  const web3 = new Web3(window.ethereum);

  console.log(web3);

  async function saveFile(jsonData: any) {
    const ipfs = await create({
      host: "localhost",
      port: 5002,
      protocol: "http",
    });

    console.log(jsonData);
    const data = Buffer.from(JSON.stringify(jsonData));
    let result = await ipfs.add(data);

    console.log(result);
    return result;
  }

  async function mintNFT(
    uri: string,
    name: string,
    ipfsData: string,
    svgData: string
  ) {
    const accounts = await window.ethereum.enable();

    contract.methods
      .safeMint(uri, name, ipfsData, svgData)
      .send({ from: accounts[0], gas: 5000000 })
      .on("receipt", function (receipt: any) {
        console.log(receipt);

        toast({
          title: "NFT Minted! ",
          description: "Your NFT has been minted successfully.",
        });

        router.replace(`/dashboard/nft`);
      })
      .on("error", function (error: any, receipt: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong. ",
          description: "There was a problem with your request.",
        });
        console.log(error, receipt);
      });
  }

  const onMintClick = async () => {
    const ipfsResult = await saveFile(json);

    console.log(ipfsResult);
    console.log(ipfsResult.path);
    const uri = `http://127.0.0.1:9090/ipfs/${ipfsResult.path}`;

    const svg = `<svg height="500" width="500" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" style="background:black;">
  <rect width="100%" height="100%" fill="none" stroke="#C5EE53" stroke-width="5"/>
  <text x="250" y="220" text-anchor="middle" fill="white" style="font-size:40px; font-weight: 800;">${name}</text>
  <text x="250" y="250" text-anchor="middle" fill="white" style="font-size:20px; font-weight: 500;">${level}</text>
  <text x="250" y="480" text-anchor="middle" fill="white" style="font-size:15px; font-weight: 400;">${date}</text>
</svg>
`;

    const res = await mintNFT(uri, name, uri, svg);
    console.log(res);
  };

  useEffect(() => {}, [nameOutput, jsonOutput]);

  return (
    <button
      disabled={!nameOutput || !jsonOutput}
      onClick={onMintClick}
      className=" mr-1 h-[42px] rounded-md bg-white px-1 py-[4px] text-black hover:opacity-80"
    >
      {nameOutput && jsonOutput
        ? `Mint ${nameOutput} NFT`
        : "Is not possible to mint NFT"}
    </button>
  );
};

export default MintNFTComponent;
