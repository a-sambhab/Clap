import React,{useEffect,useState} from "react";
import VideoPlayer from "react-video-js-player";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../helpers/Firebase";

function Player(props) {
  const [data, setData] = useState([]);
  const [dat, setDat] = useState({});
  let { add } = useParams();
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "CBS"));
      setData(querySnapshot.docs.map((doc) => doc.data()));
    })();
  }, []);


  

  useEffect(() => {
    (async () => {
      const temp = data.filter(({ teamId }) => teamId === Number(add));
      setDat(temp);
    })();
  }, [data]);

  // const videoSrc = `https://cdn.livepeer.com/hls/${dat[0].playbackId}/index.m3u8`;

  if(dat[0] && dat[0].live === true){
  return (
    <div>
    
      <div>
        {dat[0] && dat[0].playbackId && <VideoPlayer src={`https://cdn.livepeer.com/hls/${dat[0].playbackId}/index.m3u8`} width="720" height="420"></VideoPlayer>}
      </div>
    </div>
  );
  }else{
    return(<h1>Live Streaming Stopped</h1>
      )
  }
}
export default Player;

