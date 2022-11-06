const createNFT = async(contract,account,uri,code)=>{
    if (!contract) {
        return false;
      }
      const res = await contract.methods.CreateLicense(uri,code).send({from:account});
      return res;

  }
  export default createNFT