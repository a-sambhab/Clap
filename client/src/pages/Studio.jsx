import React , {useState, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../helpers/Firebase';
import Web3Context from '../contexts';

const Studio = () => {
  const [creator, setCreator] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    // const account = localStorage.getItem("CurrentAccount");
    const {account,contract} = useContext(Web3Context);
    console.log(account.currentAccount);
    const params = useParams();
    // console.log(account);
    const getCreator = async() => {
        const querySnapshot = await getDocs(collection(db,'CBS'));
        // console.log(params.id);
        const data = querySnapshot.docs.map(doc=>doc.data());
        // console.log(data);
        data.map(creators=>{  
          // console.log(creators);
          console.log(params.id);
            if(params.id==creators.teamId){
                // console.log("creator found")
                console.log(creators.address, account, String(creators.address).toUpperCase() , String(account.currentAccount).toUpperCase());
                setCreator(creators);
                if(account!==undefined && String(creators.address).toUpperCase() === String(account.currentAccount).toUpperCase()){
                  // console.log("authenticated");
                  setIsAuth(true);
                }
            }
            // return;
            // console.log(creator);
        })
    }
    const checkAuth = () => {
      // if(creator.ad)
      console.log(account)
    }
    getCreator()
  return (
    <>
    {isAuth?    
    <div className='w-full h-5/6 bg-black flex flex-row studioouter'>
      <div className='w-1/6 bg-gray-400 h-full flex flex-col justify-start items-center studiosidebar'>
        {/* {params.add} */}
        <Link to={`/studio/golive/${params.id}`} className="w-full h-12 text-center p-3 transition-all hover:bg-gray-100 studiolivebut">Go Live</Link>
        <Link to={`/studio/upload/${params.id}`} className="w-full h-12 text-center p-3 transition-all hover:bg-gray-100 studiolivebut">Upload</Link>
      </div>
      <div className='studiocontain w-5/6 bg-blue-400 h-full'>
        <div className='studiocreatorname'>Hey, {creator.name}</div>
        <div className='studiodashboard'>
          <div className='studiosubscribers'>
            <div className='studiosubscribertitle'>Subscribers</div>
            <div className='subscriber'>
              <img src='https://res.cloudinary.com/dgy8ybeoy/image/upload/v1667688750/bgimage_lzx160.png' className='subscriberimage'/>
              <div className='studiosubscribername'>Gourav Mohanty</div>
            </div>
            <div className='subscriber'>
              <img src='https://res.cloudinary.com/dgy8ybeoy/image/upload/v1667688750/bgimage_lzx160.png' className='subscriberimage'/>
              <div className='studiosubscribername'>Gourav Mohanty</div>
            </div>
            <div className='subscriber'>
              <img src='https://res.cloudinary.com/dgy8ybeoy/image/upload/v1667688750/bgimage_lzx160.png' className='subscriberimage'/>
              <div className='studiosubscribername'>Gourav Mohanty</div>
            </div>
            <div className='subscriber'>
              <img src='https://res.cloudinary.com/dgy8ybeoy/image/upload/v1667688750/bgimage_lzx160.png' className='subscriberimage'/>
              <div className='studiosubscribername'>Gourav Mohanty</div>
            </div>
          </div>
          <div className='studioquestions'>
            {/* <div className='question'>
              <div className='quesname'>Gourav Mohanty</div>
              <div className='ques'>How do I subscribe</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    :
    <div></div>
    }
    </>
    )
}

export default Studio