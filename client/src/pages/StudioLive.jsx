import React , {useState, useEffect} from 'react'
import {fetchData} from "../helpers/livepeer"
import { useParams } from 'react-router-dom';
import { collection, getDocs,query,where,updateDoc,doc } from 'firebase/firestore';
import VideoPlayer from "react-video-js-player";
import { db } from '../helpers/Firebase';

const StudioLive = () => {
  const {id}=useParams();
  const [islive, setislive] = useState(false);
  const [Api,setApi] = useState("")
  const [data, setData] = useState([]);
  const [dat, setDat] = useState({});
  // let { id } = useParams();
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "CBS"));
      setData(querySnapshot.docs.map((doc) => doc.data()));
    })();
  }, []);


  

  useEffect(() => {
    (async () => {
      const temp = data.filter(({ teamId }) => teamId === Number(id));
      setDat(temp);
    })();
  }, [data]);
  const handleChange = (event) => {
    setApi(() => ([event.target.name] = event.target.value));
  };
  const liveLink = "rtmp://rtmp.livepeer.com/live/"
  const[streamkey,setStreamkey] = useState("")
  const FetchKey = async() => {
    fetchData(Api,id).then((data)=>{
      setStreamkey(data);
    })
    setislive(true);
  }
  const copyLink = () => {
    navigator.clipboard.writeText(streamkey);
    alert("Link copied to clipboard");
  }
  const stopLive = () => {
    setislive(false);
  }
  const handleLive=async (event)=>{
    event.preventDefault();
    const q = query(collection(db, "CBS"), where("teamId", "==", Number(id)));
    let fid=null
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      fid = doc.id;
      console.log(fid);
    });

    const docRef = doc(db, "CBS", fid);
    updateDoc(docRef, {
      live: false,
    }).then(() => {
      alert("Streaming Stopped")
      stopLive();
    });}
  return (
    <div className="w-full h-5/6 bg-blue-400 flex flex-row livecontainer">
      <div className='w-1/2 h-full flex flex-col justify-center items-center bg-green-400 liveleft'>
      {islive?
      <>
        <div className='liveleftbottom balanceshow w-1/2 h-10 bg-white'>Server:{liveLink}</div>
        <button className='liveleftbottom connectwallet w-1/2 h-10 bg-white' onClick={copyLink}>Copy Stream Key</button>
        <button className='liveleftbottom connectwallet w-1/2 h-10 bg-white' onClick={handleLive}>Stop Streaming</button>

      </>
      :
      <>
        <input className='w-1/2 h-10 bg-white m-5 liveleftupper'name="Api" placeholder='Enter API Key' onChange={handleChange}></input>
        <button className='liveleftbottom connectwallet w-1/2 h-10 bg-white' onClick={FetchKey}>Fetch Stream Key</button>
      </>
      }
      </div>
      {dat[0] && dat[0].live?
        <div>
        {dat[0] && dat[0].playbackId && <VideoPlayer src={`https://cdn.livepeer.com/hls/${dat[0].playbackId}/index.m3u8`} width="720" height="420"></VideoPlayer>}
      </div>
      :
      <div className='w-1/2 h-full text-center flex justify-center items-center liveright'><div>Fetching Live Preview</div></div>
      }
    </div>
    )
}


export default StudioLive