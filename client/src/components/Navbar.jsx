import React,{useState,useContext,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { db } from '../helpers/Firebase';
import { getDocs } from "firebase/firestore";
import { collection} from "firebase/firestore";
import {fUSDCxabi} from "../contracts/fUSDCx";
import BigNumber from 'bignumber.js';
import { ethers } from "ethers";
import Web3Context from "../contexts";


const Navbar = () => {
  const [balance,setBalance] = useState(0);
    // const [creatorName,setName] = useState(null);
    // const [id,setId] = useState(null);

    window.ethereum&&window.ethereum.on('accountsChanged', function (accounts) {
        setTimeout(window.location.reload(false), 1000);
      });
      const {account,checkIfWalletIsConnected,connectWallet} = useContext(Web3Context)
      const provider = window.ethereum && new ethers.providers.Web3Provider(window.ethereum);
      let Bal=0;
      const fUSDCX =  provider && new ethers.Contract(
        "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
        fUSDCxabi,provider
     )
     
    
      const  getBalance=async ()=>{
    
       let fUSDCxBal = await fUSDCX.balanceOf(account.currentAccount);
        //console.log(provider);
        const bal = new BigNumber (fUSDCxBal._hex,16)
        // console.log("FUSDCX Balance",bal.c[0]/10000)
        Bal = bal.c[0]/10000;
        setBalance(Bal);
        //console.log(balance);
      }

    useEffect(()=>{
        checkIfWalletIsConnected()
        account.currentAccount && fetchCurrentAccount()
        account.currentAccount && getBalance()
    },[account.currentAccount])
    // const acc = localStorage.getItem("currentAccount");
    // const [account, setCurrentAccount] = useState();
    // console.log(acc);
    const [isCreator, setisCreator]   = useState(false);
    const [creatordata, setcreatordata] = useState({})
    const fetchCurrentAccount = async()=>{
        // let fid;
        const querySnapshot = await getDocs(collection(db, "CBS"));
        // console.log(querySnapshot.docs.map((doc)=> doc.data()));
        const data = querySnapshot.docs.map((doc)=>doc.data());
        // console.log(data);
        const how = data.map((creators)=>{
          // console.log(account.currentAccount)
          // console.log(String(creators.address).toUpperCase()===String(account.currentAccount).toUpperCase());
          if(String(creators.address).toUpperCase()===String(account.currentAccount).toUpperCase()){
            // console.log("found creator")
            setisCreator(true);
            setcreatordata(creators)
          }
          return true;
        })
        console.log(how);
     };
  return (
    <>
    <div className='navcontain'>
        <div className='navleft'>
          <div className='balanceshow'>USDCX Balance :${balance}</div>
          <NavLink className="addlink" to="/upgrade">Add USDX</NavLink>
        </div>
        <NavLink to='/' className='navcenter'><img src='https://res.cloudinary.com/dgy8ybeoy/image/upload/v1667706138/photo1667705982-removebg-preview_um4h32.png'/></NavLink>
        {account.currentAccount==null  ?    
        ( <div className='connectcontain'><div className='connectwallet' onClick={connectWallet}>
          Connect Wallet
        </div></div>
        )
        :
        (
          <div className='creatorstudiodiv'>
            {isCreator?
              <>
                <NavLink to={`/studio/${creatordata.teamId}`} className='showstudio'>
                  Studio
                </NavLink>
                <div className='showcreatorname'>
                  Hey, {creatordata.name}
                </div>
              </>
            :
              <>
                <NavLink to='/signup' className='signupcreator'>
                  Signup as a Creator
                </NavLink>
              </>
            }
          </div>
        )}
    </div>
    
  </>
    )
}

export default Navbar