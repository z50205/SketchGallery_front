import React, { useState, useEffect ,useLayoutEffect} from "react";
import {useSearchParams} from "react-router-dom";
import LoginButton from "./LoginButton";
import PageBar from "./PageBar";
import cloudDownloadIcon from "./icons/clouddownload.svg";
import linkIcon from "./icons/link45deg.svg";
import trashIcon from "./icons/trash.svg";
import style from "./index.css"

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [nextPage, setNextpage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") == null ? (1):(searchParams.get("page")));
  // const cards = ["a", "b"];
  useLayoutEffect(() => {
    fetchData(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.replaceState(null, '', '?' + params.toString());
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

  const toPrevPage = () => {
    setPage(page-1);
  };
  const toNextPage = () => {
    setPage(nextPage);
  };

  return (
    <div className="content-body">
      <div className="content">
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
                    Title:
                  </div>
                  <p className="table_content">
                    <div className="table_content_title">{card.title}</div>
                  </p>
                  <div className="table_content">
                    Creator:
                  </div>
                  <p className="table_content_avatar">
                    <img className="table_content_avatar_img" src={"image/"+card.avatar} />
                    <div className="table_content_avatar_name">{card.creator}</div>
                  </p>
                  <p className="table_content_tagdiv">
                    {card.tags.map((tag)=>(
                      <div className="table_content_tag">{tag}</div>))}
                  </p>
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

export default Cards;
