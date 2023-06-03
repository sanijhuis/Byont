import { useEffect, useState } from "react";
import Web3 from "web3";

export default function MetaMask() {
  const [error, setError] = useState(null);
  const [web3, setWeb3] = useState<any>(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Var = new Web3(window.ethereum);
        setWeb3(web3Var);
      }
    } catch (err) {}
  };

  useEffect(() => {
    let isSubscribed = true;
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: any) => {
        if (isSubscribed) {
          console.log("Accounts changed", accounts);
          setWeb3(new Web3(window.ethereum));
        }
      };
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <button onClick={connectWallet}>
        {web3 ? `Web3 is connected!` : "Connect to web3"}
      </button>
      {error && <p>{error}</p>}
    </>
  );
}
