import React, { useState,useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import {fUSDCxabi} from "../contracts/fUSDCx";
import {ERC20abi} from "../contracts/ERC20abi";
import BigNumber from 'bignumber.js';


let chainId=null;
let sf = null;
const provider = new ethers.providers.Web3Provider(window.ethereum);
  
const signer = provider.getSigner();


const getInfo = async()=>{

 chainId = await window.ethereum.request({ method: "eth_chainId" });
 sf = await Framework.create({
  chainId: Number(chainId),
  provider: provider
});
}

async function bgtApprove(amt) {
  await getInfo();


  const fUSDC =  new ethers.Contract(
    "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2",
    ERC20abi,signer
 )
 
  try {
    console.log("approving BGT spend");
    await fUSDC.approve(
        "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
      ethers.utils.parseEther(amt.toString())
    ).then(function (tx) {
      console.log(
        `Congrats, you just approved your DAI spend. `
      );
    });
  } catch (error) {
    console.error(error);
  }
}

//where the Superfluid logic takes place

async function bgtUpgrade(amt) {
   await getInfo()

  const fUSDCx = await sf.loadSuperToken(
    "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7"
  );

  try {
    console.log(`upgrading ${amt} fusd to fusdx`);
    const amtToUpgrade = ethers.utils.parseEther(amt.toString());
    //const amtToUpgrade = amt;
    console.log(amtToUpgrade.toString())
    const upgradeOperation = fUSDCx.upgrade({
      amount: amtToUpgrade.toString()
  
    });
    const upgradeTxn = await upgradeOperation.exec(signer);
    await upgradeTxn.wait().then(function (tx) {
    });
  } catch (error) {
    console.error(error);
  }
}
const Upgrade = () => {
  const [amount, setAmount] = useState("");
  const [balance,setBalance] = useState(0);
  const [isApproved, setisApproved] = useState(false)
  const fUSDCX =  new ethers.Contract(
    "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
    fUSDCxabi,provider
 )
  let Bal = 0;
  const  getBalance=async ()=>{

    let fUSDCxBal = await fUSDCX.balanceOf(localStorage.getItem('CurrentAccount'));
     console.log(provider);
     const bal = new BigNumber (fUSDCxBal._hex,16)
     console.log("FUSDCX Balance",bal.c[0]/10000)
     Bal = bal.c[0]/10000;
     setBalance(Bal);
     console.log(balance);
   }
   useEffect(() => {
     getBalance();
     
   }, []);


  const handleAmountChange = (e) => {
    setAmount(() => ([e.target.name] = e.target.value));
  };
  const handleSubmit = async (e) => {
    await bgtApprove(amount)
    .then(()=>{
      setisApproved(true);
    })
    alert("Congrats, you just approved your USDC spend.");

  };
  const handleSubmit2 = async (e) => {
    await bgtUpgrade(amount);
    alert(`Congratulations! ${amount} USDCX has been credited`)
    setTimeout(()=>window.location.reload(false),1000)
 
  };


  return (
      <>
      <div className="upgradecontainer">
   <div className="upgradebalanceshow">
      <h1>USDCx Balance: ${balance} </h1>
   </div>
    

    <form className="upgradebalanceform">
          <h2 className="upgradetitle d-flex justify-content-center my-2">Upgrade to USDCx </h2>
          <div className="mb-3 ">
            <input
              name="amount"
              onChange={handleAmountChange}
              value={amount}
              type="number"
              className="form-control upgradeform"
              id="amount"
              placeholder="Enter Amount in Dollars"
            />
          </div>
          <div className="buttoncontainer">
          {isApproved? 
          <button
              type="button"
              onClick={handleSubmit2}
              className="connectwallet d-grid btn btn-success my-3 col-2 mx-auto"
            >
              Upgrade
            </button>
          :
            <button
              type="button"
              onClick={handleSubmit}
              className="connectwallet d-grid btn btn-success my-3 col-2 mx-auto"
            >
              Approve
            </button>
          
          }
          </div>
      </form>
      </div>
      </>
  );
};


export default Upgrade
