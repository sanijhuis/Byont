"use client";

import contract from "@/lib/get-contract";
import { create } from "ipfs-http-client";
import React, { useState } from "react";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

async function saveFile(jsonData: string) {
  const ipfs = await create({
    host: "localhost",
    port: 5002,
    protocol: "http",
  });
  let result = await ipfs.add(jsonData);
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
    })
    .on("error", function (error: any, receipt: any) {
      console.log(error, receipt);
    });
}

const MintNFTComponent = () => {
  const [name, setName] = useState("");
  const [json, setJson] = useState("");

  const onMintClick = async () => {
    const ipfsResult = await saveFile(json);
    console.log(ipfsResult.path);
    const uri = `http://127.0.0.1:9090/ipfs/${ipfsResult.path}`;

    const svg = `<svg height="500" width="500" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" style="background:green;">
  <text x="250" y="220" text-anchor="middle" fill="black" style="font-size:40px; font-weight: 800;">Several lines:</text>
  <text x="250" y="250" text-anchor="middle" fill="black" style="font-size:20px; font-weight: 500;">First line.</text>
  <text x="50" y="480" text-anchor="middle" fill="black" style="font-size:15px; font-weight: 400;">Second line.</text>
</svg>
`;

    await mintNFT(uri, name, uri, svg);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <textarea
        value={json}
        onChange={e => setJson(e.target.value)}
        placeholder="Enter JSON Data"
      />
      <button onClick={onMintClick}>Mint NFT</button>
    </div>
  );
};

export default MintNFTComponent;
