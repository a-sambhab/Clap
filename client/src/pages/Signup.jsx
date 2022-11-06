import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
// import uniqid from "uniqid";

// import {useHistory} from 'react-router-dom'
import { db } from "../helpers/Firebase";
import client from "../helpers/ipfs";
import { useEffect } from "react";
// import bgImg from "../image/bgimage.png";
import { useForm } from "react-hook-form";
import { CreateLicense } from "../contracts/AccessToken.json";

const Signup = () => {
  const [teamId, setTeamId] = useState("");
  useEffect(() => {
    setTeamId(Math.round(Math.random() * 10000));
  }, []);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [profilePic, setProfilepic] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  // let history = useHistory();

  const UploadNFTImage = async () => {
    //let uri="" ;
    // console.log(Coverimage)
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mystiq");
    data.append("cloud_name", "doybtqm8h");
    await fetch("https://api.cloudinary.com/v1_1/doybtqm8h/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        const res = data.url;

        await handleData(res);
      })
      .catch((err) => console.log(err));
  };
  const handleData = async (res) => {
    const obj = {
      name: "CBSW",
      description: `This is an Exclusive NFT Access Pass for ${teamId}`,
      image: res,
      attributes: [
        {
            "trait_type":"TeamId",
            "value":` ${teamId}`
        }
      ],
    };

    const result = await client.add(JSON.stringify(obj));
    const str = "ipfs://";
    const finalResult = str.concat(String(result.path));
    // console.log(result)
    console.log(finalResult);
    try {
      addDoc(collection(db, "CBS"), {
        name,
        address:address.toLowerCase(),
        price,
        image: profilePic,
        teamId: teamId,
        tokenUri: finalResult,
        live: false,
      });
      //console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    //localStorage.getItem("tokenURI",finalResult);
    alert("NFT Data added");
    // await createNFT(Contract,finalResult,sellerI,productId,customer.toLowerCase(),expiry,res,account.currentAccount);
  };

  const UploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mystiq");
    data.append("cloud_name", "doybtqm8h");
    await fetch("https://api.cloudinary.com/v1_1/doybtqm8h/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        //setUrl(data.url);
        console.log(data.url);
        setProfilepic(data.url);
        alert("Profile Image Uploaded");
      })
      .catch((err) => console.log(err));
  };
  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };
  const handleName = (event) => {
    setName(() => ([event.target.name] = event.target.value));
  };
  const handleAddress = (event) => {
    setAddress(() => ([event.target.name] = event.target.value));
  };
  const handlePrice = (event) => {
    setPrice(() => ([event.target.name] = event.target.value));
  };
  const handleProfilepic = async (event) => {
    event.preventDefault();
    await UploadImage();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await UploadNFTImage()
    .then(()=>{
      // history.push("/");
      window.location.href = "localhost:3000"
    })

    alert("Congratulations You are signed UP!");
  };
  const {
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <section>
    <div className="register">
      <div className="col-2">
        {/* <img src={bgImg} alt="" /> */}
      </div>
      <div className="col-1">
        <h2>Sign Up</h2>
        <div className="registerspan">Register and enjoy the services</div>
        <div
          id="form"
          className="flex flex-col"
        >
          <input
            type="text"
            name="Name"
            id="Name"
            onChange={handleName}
            className="form-control"
            placeholder="Name"
          />
          <input
            type="text"
            name="address"
            id="address"
            onChange={handleAddress}
            className="form-control"
            placeholder="Address"
          />
          <input
            type="file"
            id="inputGroupFile02"
            onChange={handleImage}
            className="form-control"
          />
          <button className="subsr" onClick={handleProfilepic}>Click To upload</button>
          <input
            type="number"
            name="Price"
            id="Price"
            onChange={handlePrice}
            className="form-control"
            placeholder="Price"
          />
          <input
            type="file"
            id="inputGroupFile02"
            onChange={handleImage}
            className="form-control"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="d-grid btn btn-success my-3 col-2 mx-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </section>
    )
}

export default Signup