import React, { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import PageBar from "./PageBar";
import cloudDownloadIcon from "./icons/clouddownload.svg";
import linkIcon from "./icons/link45deg.svg";
import trashIcon from "./icons/trash.svg";
import style from "./index.css"

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [username, setUsername] = useState("");
  const [page, setPage] = useState(1);
  const [nextPage, setNextpage] = useState(1);
  // const [loading, setLoading] = useState(true);
  // const cards = ["a", "b"];
  useEffect(() => {
    fetchData(page);
    fetchusername();
  }, [page]);

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
      const response = await fetch(`/api/resources?page=${page}`);
      const result = await response.json();
      console.log(result);
      setCards(result["imageData"]);
      setNextpage(result["nextPage"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  const fetchusername = async () => {
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
        setUsername(data.user);
      } else {
        console.log("Error message:", data.message);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

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
        console.log("creator:" + creator);
        console.log("data.user:" + data.user);
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
      const response = await fetch(`/api/delete/${id}?page=${page}`, {
        method: "DELETE",
      });
      const result = await response.json();
      setCards(result["imageData"]);
      setNextpage(result["nextPage"]);
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };
  const handleClick = () => {
    window.location.href = "/";
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

  const saveImage = async (src) => {
    try {
      const imageResponse = await fetch(`/image/${src}`);
      if (!imageResponse.ok) throw new Error("Failed to fetch image");

      const blob = await imageResponse.blob();
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const searchString = "images/";
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
    <div>
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
                <div className="table_content">
                  Title：
                  <br />
                  {card.title}
                </div>
                <p className="table_content">
                  Creator:
                  <br />
                  {card.creator}
                </p>
                <p className="table_content">
                  Description:
                  <br />
                  {card.description}
                </p>
                <div
                  className="container icon"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    color:"white",
                  }}
                >
                  <span onClick={() => handleDelete(card.id, card.creator)}>
                    <img src={trashIcon} color="white" alt="..." />
                    Delete
                  </span>
                  <span onClick={() => redirectToSketch(card.src)}>
                    <img src={linkIcon} alt="..." />
                    Link to SharingSketch
                  </span>

                  <span onClick={() => saveImage(card.src)}>
                    <img src={cloudDownloadIcon} alt="..." />
                    Download
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
  );
};

export default Cards;
