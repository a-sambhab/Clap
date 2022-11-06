import React, {useState, useEffect,useContext} from 'react'
import { Link, NavLink } from 'react-router-dom';
import client from '../helpers/ipfs'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../helpers/Firebase';
import getlit from "../helpers/AlchemyNFT";
import Web3Context from '../contexts'; 

const Creator = (props) => {
  const {account} = useContext(Web3Context)

  useEffect(()=>{
      account.currentAccount && Subscribe()
  },[account.currentAccount])
 // const account = localStorage.getItem("CurrentAccount");
  const [subscribed, setsubscribed] = useState(false)
  const Subscribe = async() => {
      const temp = await getlit(account.currentAccount, props.creatorId);
      //console.log(temp,"haha")
      setsubscribed(temp >= 1?true:false);
  }
  // const getNFTS = async() => {
  //     const temp = await getlit(account, props.creatorId);
  //     console.log(temp);
  // }
  // getNFTS();

  return(
      <div className='creatorcontain'>
      <NavLink to={subscribed? `/creator/${props.creatorId}` : `/subscribe/${props.creatorId}`} className='creatorinnercontain'>
          <div className='creatorarrow'>
              <img src='https://res.cloudinary.com/dgy8ybeoy/image/upload/v1667490939/right-arrow_wwvdld.png' className='arrowhead'/>
          </div>
          <img alt="Profile" src={props.image} className='creatorimage'/>
          <div className='creatorbutton'>
              <div className='creatorname'>{props.name}</div>
              <div className='creatordesc'>Product Designer</div>
          </div>
      </NavLink>
      </div>
  )
}

const Landing = () => {
  const [data, setData] = useState([]);
    // const [balance, setBalance] = useState(0);
    const fetchD = async() => {
        const querySnapshot = await getDocs(collection(db, "CBS"));
        console.log(querySnapshot.docs.map((doc)=> doc.data()));
        setData(querySnapshot.docs.map((doc)=> doc.data()));
      }
    useEffect(()=>{
        fetchD()
    }, [])
  return (
    <div className='grid grid-cols-3 gap-4 landingcontain'>
    {data && data.map((creator)=>{
        return(
            <Creator
                creatorId={creator.teamId}
                image={creator.image}
                name={creator.name}

            />
        )
    })}
    {/* <Creator
        creatorId="421"
    />
    <Creator
        creatorId="422"
    />
    <Creator
        creatorId="423"
    />
    <Creator
        creatorId="424"
    /> */}
</div>
    )
}

export default Landing