import React from 'react'
import { useState, useEffect } from "react";
 import { storage } from "../helpers/Firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Upload = () => {
  const [videoUpload, setVideoUpload] = useState(null);
  const [videoList, setVideoList] = useState([]);

  const videoListRef = ref(storage, "images/");

  const uploadVideo = () => {
    if (videoUpload == null) return;
    const videoRef = ref(storage, `videos/${videoUpload.name + v4()}`);
    uploadBytes(videoRef, videoUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setVideoList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(videoListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setVideoList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <div className="Upload">
    <div className="uploadleft">

      <input
        type="file"
        onChange={(event) => {
          setVideoUpload(event.target.files[0]);
        }}
      />
      {/* <div className="uploadcontain"> */}
      <button className="uploadbutton" onClick={uploadVideo}>Upload</button>
      {/* </div> */}
    </div>

    <div className="uploadright">

      {videoList.map((url) => {
        return <iframe title='preview' src={url}></iframe>;
      })}
    </div>
    </div>
    )
}

export default Upload