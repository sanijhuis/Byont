import { abi } from "../artifacts/contracts/CardDashboard.sol/CardDashboard.json";
import Web3 from "web3";

const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));

const address = "0x0073798C448C2A33B1135D25A05214bd8A157AD0";

const contract = new web3.eth.Contract(abi as any[], address);

export default contract;
