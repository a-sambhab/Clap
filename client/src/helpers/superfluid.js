import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
let chainId=null;
let sf = null;
let provider = null
  
let signer = null


const getInfo = async()=>{
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

 chainId = await window.ethereum.request({ method: "eth_chainId" });
 sf = await Framework.create({
  chainId: Number(chainId),
  provider: provider
});
}

const fUSDCx = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";

const createNewFlow= async (amount,address,sender) => {
 await getInfo() 
    try {


      const createFlowOperation = sf.cfaV1.createFlow({
        sender:sender,
        receiver: address,
        flowRate:amount*385802469135,
        superToken: fUSDCx,
        // userData?: string
      });            
  
      console.log("Creating your stream...");
      const result = await createFlowOperation.exec(signer);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

 const StopFlow= async (_sender)=> {

   
    try {
      const StopFlowOperation = sf.cfaV1.deleteFlow({
        sender:_sender,
        receiver: '0x721d8574379BF9bB88a4Ca3442cCE095556279A7',
        superToken: fUSDCx
        // userData?: string
      });
  
  
      console.log("Stopping your stream...");
      const result = await StopFlowOperation.exec(signer);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
export {createNewFlow,StopFlow}