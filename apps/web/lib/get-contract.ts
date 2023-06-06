import { abi } from "../artifacts/contracts/NFTFileScanner.sol/NFTFileScanner.json";
import Web3 from "web3";

const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));

const address = "0xC4D0AC1a2d800bBF3324bD419DeB92c8B3178C19";

const contract = new web3.eth.Contract(abi as any[], address);

export default contract;
