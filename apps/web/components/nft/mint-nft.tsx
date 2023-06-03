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

async function mintNFT(uri: string, name: string, ipfsData: string) {
  const accounts = await window.ethereum.enable();

  contract.methods
    .safeMint(accounts[0], uri, name, ipfsData)
    .send({ from: accounts[0] })
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
    const uri = `http://127.0.0.1:9090/ipfs/${ipfsResult.path}`;

    await mintNFT(uri, name, uri);
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
