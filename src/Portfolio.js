import React, { useState, useEffect ,useLayoutEffect} from "react";
import {useSearchParams} from "react-router-dom";
import LoginButton from "./LoginButton";
import PageBar from "./PageBar";
import cloudDownloadIcon from "./icons/clouddownload.svg";
import linkIcon from "./icons/link45deg.svg";
import trashIcon from "./icons/trash.svg";
import displayIcon from "./icons/eye.svg";
import hideIcon from "./icons/eye-slash.svg";
import closeIcon from "./icons/close.svg";
import style from "./index.css"

const Portfolio = ({username,aboutme,avatar,reloadFunc}) => {
  const [cards, setCards] = useState([]);
  const [nextPage, setNextpage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") == null ? (1):(searchParams.get("page")));
  
  useLayoutEffect(() => {
    fetchData(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.replaceState(null, '', '?' + params.toString());
  }, [page]);
  // const fetchuser = async () => {
  //   try {
  //     const response = await fetch("/membership", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     if (data.status === "success") {
  //       setUsername(data.username);
  //       if (data.avatar){
  //         let avatar=document.getElementById("user-avatar");
  //         let replaceavatar=document.createElement("img");
  //         replaceavatar.id="user-avatar";
  //         replaceavatar.className="bd-placeholder-img rounded-circle user-avatar";
  //         replaceavatar.src="image/"+data.avatar+ "?timestamp=" + new Date().getTime();
  //         avatar.replaceWith(replaceavatar);
  //       }
  //       if (data.aboutme){
  //         setAboutme(data.aboutme);
  //       }
  //     } else {
  //       console.log("Error message:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching current user:", error);
  //   }
  // };
  const formatDate = (isodate) => {
    const utcDate = new Date(isodate);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    let localTime = new Intl.DateTimeFormat('en-US', options).format(utcDate);
    return localTime;
  };
  const fetchData = async (page) => {
    try {
      const response = await fetch(`/api/portfolio/resources?page=${page}`);
      const result = await response.json();
      setCards(result["imageData"]);
      setNextpage(result["nextPage"]);
      const element = document.getElementById('root');
      element.scrollIntoView({
        behavior: 'instant',
        block: 'start'
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  const showUpdateForm = (pivot) =>{
    const mask=document.getElementById("upload-mask");
    if (pivot){
      mask.style.display = "block";
    }else{
      mask.style.display = "none";
    }
  }
  const handleDelete = async (id, creator) => {
    console.log("Attempting to delete card with id:", id);
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
      if (data.status === "success" && creator === data.user) {
        const result = await deleteSql(id,page);
      } else {
        console.log("Error message:", data.message);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const deleteSql = async (id,page) => {
    try {
      const response = await fetch(`/api/image/${id}?page=${page}`, {
        method: "DELETE",
      });
      const result = await response.json();
      setCards(result["imageData"]);
      setNextpage(result["nextPage"]);
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };
  const toggleDisplay = async (id) => {
    try {
      const response = await fetch(`/api/image/${id}/display?page=${page}`, {
        method: "PATCH",
      });
      const result = await response.json();
      setCards(result["imageData"]);
    } catch (error) {
      console.error("Error toggle data:", error.message);
    }
  };
  const toPrevPage = () => {
    setPage(page-1);
  };
  const toNextPage = () => {
    setPage(nextPage);
  };
  const redirectToSketch = async (src) => {
    document.cookie = `src=${src}`;
    window.location.href = "/chooseroom";
  };
  const uploadProfile = async () => {
    const uploadForm=new FormData();
    let uploadFile=document.getElementById("uploadFormFile").files[0];
    if (uploadFile==undefined){
      uploadFile='';
    }
    uploadForm.append("avatar", uploadFile);
    uploadForm.append("about_me", document.getElementById("uploadFormAboutme").value);
    const response=await fetch("/api/user/profile",{
      method: "PATCH",
      body:uploadForm,
    }) 
    const result = await response.json();
    let userInfo=document.getElementById("user-info");
    if (result["message"]="upload success!"){
      userInfo.textContent="Upload success";
      reloadFunc();
    }
    else{
      userInfo.textContent("Upload fail.Please contact webmaster.")
    }
  };

  const saveImage = async (src) => {
    try {
      const imageResponse = await fetch(`/image/${src}`);
      if (!imageResponse.ok) throw new Error("Failed to fetch image");

      const blob = await imageResponse.blob();
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const searchString = "image/";
      const index = src.indexOf(searchString);
      if (index !== -1) {
        const remainingString = src.substring(index + searchString.length);
        link.download = remainingString;
        console.log(remainingString);
      } else {
        link.download = "unknown.jpg";
        console.log("未找到");
      }
      link.href = url;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="content-body">
      <div id="upload-mask" className="mask active">
        <div className="uploadform">
          <img className="uploadform-close" src={closeIcon} onClick={() => showUpdateForm(false)}/>
          <div className="uploadform-title">Update Info</div>
          <div className="uploadform-label"><b>Avatar</b>(type:jpg,png;size:&lt;2MB)</div>
          <input className="uploadform-img" type="file" id="uploadFormFile" accept="image/png, image/jpeg"/>
          <div className="uploadform-label"><b>About me</b></div>
          <textarea className="uploadform-text" id="uploadFormAboutme"></textarea>
          <div id="user-info" className="uploadform-info"></div>
          <div style={{textAlign:"end"}}>
            <button className="uploadform-button" onClick={() => uploadProfile()}>Update</button>
          </div>
        </div>
      </div>
      <div className="content"> 
        <div className="profile">
          <div className="profile-upper">
            <div className="user-profile">
                <img id="user-avatar" className="bd-placeholder-img rounded-circle user-avatar" src={avatar}/>
                <div className="profile-info">
                  <div className="user-name">{username}</div>
                </div>
            </div>
            <div className="profile-update">
              <button className="profile-update-button" onClick={() => showUpdateForm(true)}>Update profile</button>
            </div>
          </div>
          <div className="profile-info">
            <div className="user-aboutme">{aboutme}</div>
          </div>
        </div>
        <div className="work-title">Your Work:</div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          {cards.map((card) => (
            <div key={card.id} className="col">
              <div
                className="card p-3"
                style={{ backgroundColor: "transparent" }}
              >
                <img
                  src={"/image/" + card.src}
                  className="card-img-top border border-dark border-1 rounded-1"
                  alt="..."
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                />
                <div className="card-body">
                  <p className="table_content">
                    Title：
                    <br />
                    {card.title}
                  </p>
                  <p className="table_content">
                    Description:
                    <br />
                    {card.description}
                  </p>
                  <div className="table_content">
                    Tags:
                    </div>
                  <p className="table_content">
                    {card.tags.map((tag)=>(
                      <div className="table_content_tag">{tag}</div>))}
                  </p>
                  <div
                    className="container icon"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      color:"white",
                      flexWrap:"wrap"
                    }}
                  >
                    <span onClick={() => toggleDisplay(card.id)}>
                      <img src={card.is_display ? displayIcon :hideIcon} alt="..." />
                      {card.is_display ? "Display" :"Hide"}
                    </span>
                    <span onClick={() => redirectToSketch(card.src)}>
                      <img src={linkIcon} alt="..." />
                      Link to SharingSketch
                    </span>
                    <span onClick={() => saveImage(card.src)}>
                      <img src={cloudDownloadIcon} alt="..." />
                      Download
                    </span>
                    <span onClick={() => handleDelete(card.id, card.creator)}>
                      <img src={trashIcon} color="white" alt="..." />
                      Delete
                    </span>
                  </div>
                </div>
                <div className="card-footer">
                  <p className="card-text table_content">
                    Created:{formatDate(card.create_time)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      <PageBar toPrevPage={toPrevPage} toNextPage={toNextPage} nextPage={nextPage} page={page}/>
      </div>
    </div>
  );
};

export default Portfolio;
