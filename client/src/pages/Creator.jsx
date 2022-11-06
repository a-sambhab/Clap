import React, {useState, useEffect} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../helpers/Firebase';
import { useParams,Link } from 'react-router-dom';
import { storage } from "../helpers/Firebase";
import { ref, uploadBytes,  getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Videos = () => {
  return(
      <>
          <div className='videocontain'>
              <iframe className='videoplay' src='https://res.cloudinary.com/dgy8ybeoy/video/upload/v1667704711/Woman_-_58142_tp6ttk.mp4'></iframe>
              <div className='videoinfo'></div>
          </div>
      </>
  )
}


const Creator = () => {
  const params = useParams();
    const [creator, setcreator] = useState({});
    const [setVideos, setSetVideos] = useState([]);
    const fetch = async() => {
        const querySnapshotcreator = await getDocs(collection(db, "CBS"));
        console.log(querySnapshotcreator.docs.map((doc)=> doc.data()));
        const creators = querySnapshotcreator.docs.map((doc)=> doc.data());
        creators.map((doc)=>{
          if(params.id==doc.teamId){
              console.log("creator found");
              setcreator(doc);
          }
        })
      }
    useEffect(()=>{
        fetch()
    }, [])
  return (
    <div className='creatorpagecontain'>
    <div className='creatorpagetop'>
        <img alt="bg" className='creatorpagebg' src='https://res.cloudinary.com/doybtqm8h/image/upload/v1648362954/kppppnzfvodiiw6xem3s.jpg'/>
        <img alt="profile" className='creatorpageprofile' src={creator.image}/>
    </div>
    {/* <button on>List All Files</button> */}
    <div className='videogridcontain'>
        <div className='creatorpageinfo'>
            <div className='creatorpagename'>{creator.name}</div>
            <div className='creatorpagedesc'>Product Designer</div>
        </div>
        {creator.live ?(<Link to={`/liveView/${params.id}`}>View Live</Link>):(<></>)}
        <div className='videogrid'>
            <Videos/>
            <Videos/>
            <Videos/>
        </div>
    </div>
</div>
    )
}

export default Creator