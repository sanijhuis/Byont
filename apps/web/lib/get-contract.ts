import { abi } from "../artifacts/contracts/CardDashboard.sol/CardDashboard.json";
import Web3 from "web3";

const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));

const address = "0x8031520c3df811942c4F2eA5Cc25CDB02278eB7d";

const contract = new web3.eth.Contract(abi as any[], address);

export default contract;
