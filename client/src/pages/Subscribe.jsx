import React, {useState, useEffect,useContext} from 'react';
import { Link, useParams } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../helpers/Firebase';
import Web3Context from '../contexts';
import createNFT from '../contexts/mint';
import { createNewFlow } from '../helpers/superfluid';

const Subscribe = () => {

  const [creator, setCreator] = useState({});
    const params = useParams();
    console.log(params.id)
    const {account,contract} = useContext(Web3Context);
    const getCreator = async() => {
        const querySnapshot = await getDocs(collection(db,'CBS'));
        // console.log(params.id);
        const data = querySnapshot.docs.map(doc=>doc.data());
        console.log(data);
        data.map(creators=>{
            console.log(creators.teamId)
            if(params.id==creators.teamId){
                console.log("creator found")
                setCreator(creators);
            }
            
            // console.log(creator);
        })
    }
    useEffect(() => {
      getCreator();
    }, [])
    const mint=async()=>{
        //console.log(creator.address,typeof creator.tokenUri,creator.teamId)
        //const res1 =  ethers.utils.getAddress(creator.address)
       try{
        createNewFlow(creator.price,creator.address,account.currentAccount).then(async()=>{
                const res = creator && await createNFT(contract,account.currentAccount,creator.tokenUri,creator.teamId)
                console.log(res);
                alert(`Congratulations You are subscribed ! Check your accesstoken at https://testnets.opensea.io/assets/mumbai/0xa5c936c97157291eb033bb39e95b8ed64021474f/${res.events.Transfer.returnValues.tokenId}`)
            })
       }
       catch(err){
        alert("Something Unexpected happened")
       }
    }
  return (
    <div className='subscribecontain'>
    <div className='subscribeleft'>
        <img className='subscribeleftimage' src={`${creator.image}`}/>
        <div className='subscribebuttonborder'>
        <button className='subscribebutton' onClick={mint}>
            Subscribe ${creator.price}/month
        </button>
        </div>
        
    </div>
    <div className='subscriberight'>
        <div className='subscribercirclecontain'>
            <div className='subscribercircle'></div>
        </div>
        <div className='subscribernameinfo'>
            <div className='subscribername'>{creator?creator.name:"Creator"}</div>
            <div className='subscriberdesc'>Product Designer</div>
        </div>
        <div className='subscriberbiginfo'>
            <div className='subscriberinfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</div>
        </div>
    </div>
</div>
    )
}

export default Subscribe