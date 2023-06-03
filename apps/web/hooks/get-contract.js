import { abi } from "../artifacts/contracts/CardDashboard.sol/CardDashboard.json";
import Web3 from "web3";

const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));

const address = "0xAd771f634CB03fE95B1d0689a3D1DF0316Fb744f";

const contract = new web3.eth.Contract(abi, address);

export default contract;
