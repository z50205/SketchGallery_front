import React, { useState, useEffect } from "react";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [username, setUsername] = useState('');
  // const [loading, setLoading] = useState(true);
  // const cards = ["a", "b"];

  const formatDate = (isodate) => {
    const date = new Date(isodate);
    const options = {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const localDateString = date.toLocaleString("zh-TW", options);
    return localDateString;
  };

  useEffect(() => {
    // 定義一個異步函數來獲取數據
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/resources");
        const result = await response.json();
        console.log(result);
        setCards(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    const fetchusername = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/membership", {
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

    fetchData();
    fetchusername();
  }, []); // 空依賴數組表示只在組件掛載時執行

  const handleDelete = async (id, creator) => {
    console.log("Attempting to delete card with id:", id);
    try {
      const response = await fetch("http://localhost:3001/api/membership", {
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
        const result = await deleteSql(id);
      } else {
        console.log("Error message:", data.message);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const deleteSql = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete/${id}`, {
        method: "DELETE",
      });

      console.log("Response status:", response.status); // 打印响应状态

      if (response.ok) {
        setCards((prevCards) => {
          const updatedCards = prevCards.filter((card) => card.id !== id);
          console.log(
            "Card deleted successfully. Updated cards:",
            updatedCards
          );
          return updatedCards;
        });
      } else {
        console.error("Error deleting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };
  const handleClick = () => {
    window.location.href = "http://localhost:3001";
  };
  const redirectToSketch = async (src) => {
    // try {
    //   const imageResponse = await fetch(`http://localhost:5000${src}`);
    //   if (!imageResponse.ok) throw new Error("Failed to fetch image");

    //   const blob = await imageResponse.blob();
    //   console.log(blob);
    //   const formData = new FormData();
    //   formData.append('image', blob, 'image.png');

    // } catch (error) {
    //   console.error("Error downloading image:", error);
    // }
    document.cookie = `src=${src}`;
    window.location.href = "http://localhost:3001/api/galleryImport";
    // try {
    //   const response = await fetch(`http://localhost:3001/api/user_status`, {
    //     method: "GET",
    //     credentials: 'include'
    //   });

    //   console.log("Response user status:", response.status);

    //   if (response.ok) {
    //     console.log("OK");
    //   } else {
    //     console.error("Error user status:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error user status:", error.message);
    // }
  };

  const saveImage = async (src) => {
    try {
      const imageResponse = await fetch(`http://localhost:5000${src}`);
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
      <div className="row">
        <div className="col">
          <h1 className="fw-bold m-3">Sharing Sketch Gallery</h1>
        </div>
        <div className="col-sm-3">
          <h1
            className="fw-bold m-3 text-center border border-dark border-3"
            style={{
              backgroundColor: "rgb(182, 182, 255)",
              borderTopRightRadius: "15px",
            }}
            onClick={handleClick}
          >
            Sharing Sketch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
          </h1>
        </div>
      </div>
      <h5>hello,{username}</h5>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {cards.map((card) => (
          <div key={card.id} className="col">
            <div
              className="card p-3"
              style={{ backgroundColor: "rgb(233, 243, 255)" }}
            >
              <img
                src={"http://localhost:5000" + card.src}
                className="card-img-top border border-dark border-1 rounded-1"
                alt="..."
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  Title：
                  <br />
                  {card.title}
                </h5>
                <p className="card-text">
                  Creator:
                  <br />
                  {card.creator}
                </p>
                <p className="card-text">
                  Description:
                  <br />
                  {card.description}
                </p>
                <div
                  className="container fs-10"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <span onClick={() => handleDelete(card.id, card.creator)}>
                    <img src="trash.svg" alt="..." />
                    Delete
                  </span>
                  <span onClick={() => redirectToSketch(card.src)}>
                    <img src="link-45deg.svg" alt="..." />
                    Link to SharingSketch
                  </span>

                  <span onClick={() => saveImage(card.src)}>
                    <img src="cloud-download.svg" alt="..." />
                    Download
                  </span>
                </div>
              </div>
              <div className="card-footer">
                <p className="card-text">
                  Created:{formatDate(new Date(card.create_time))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
