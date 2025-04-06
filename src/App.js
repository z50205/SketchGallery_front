import React, { useState, useEffect} from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import Cards from "./Cards";
import Portfolio from "./Portfolio";
import Upload from "./Upload";
import Nav from "./Nav";
import ImageInfo from "./ImageInfo";
import avatarDefaultIcon from "./icons/user.svg";

const App = () => {
  const [reloadCards, setReloadCards] = useState(false);
  const [username, setUsername] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [avatar, setAvatar] = useState(avatarDefaultIcon);

  const triggerCardReload = () => {
    setReloadCards((prev) => !prev);
  };
  const fetchuser = async () => {
    try {
      const response = await fetch("/membership", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success") {
        setUsername(data.username);
        if (data.avatar){
          setAvatar("image/"+data.avatar+ "?timestamp=" + new Date().getTime());
        }
        if (data.aboutme){
          setAboutme(data.aboutme);
        }
      } else {
        console.log("Error message:", data.message);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };


  useEffect(()=>{
    fetchuser();
  },[]);


  return (
    <>
      <Nav username={username} avatar={avatar}/>
      <Routes>  
        <Route path='/gallery/' element={<Cards key={reloadCards} />} />
        <Route path='/portfolio' element={<Portfolio username={username} aboutme={aboutme} avatar={avatar} reloadFunc={fetchuser} />} />
        <Route path='/imageinfo/:imageid' element={<ImageInfo />} />
      </Routes>
    </>
  );
};

export default App;
