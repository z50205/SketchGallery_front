import React, { useState, useEffect } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import burgerIcon from "./icons/burger.svg";
import logoutIcon from "./icons/logout.svg";
import profileIcon from "./icons/profile.svg";
import userIcon from "./icons/user.svg";

const Nav = ({username,avatar}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function ShowMemberTools({username}){
    if (username){
      return(
    <Offcanvas.Body>
      <div className="canvas-left-info">
        <img className="canvas-left-info-img" src={avatar} />
        <div className="canvas-left-info-name">Hi,{username}</div>
      </div>
      <div className="canvas-left-item">
        <a className="canvas-left-item-link" href="/portfolio">
          <div className="canvas-left-itemdiv">
            <img className="canvas-left-img" src={profileIcon} />
            <div className="canvas-left-text">Edit Profile</div>
          </div>
        </a>
      </div>
      <hr style={{borderWidth: "1px",color: "white",opacity: "1"}} />
      <div className="canvas-left-item">
        <a className="canvas-left-item-link" href="/logout">
          <div className="canvas-left-itemdiv">
            <img className="canvas-left-img" src={logoutIcon} />
            <div className="canvas-left-text">Log Out</div>
          </div>
        </a>
      </div>
    </Offcanvas.Body>)
    }else{
      return(
    <Offcanvas.Body>
      <div className="canvas-left-info">
        <img className="canvas-left-info-img" src={userIcon} />
        <div className="canvas-left-info-name">Hi,Anonymous</div>
      </div>
      <div className="canvas-left-item">
        <a className="canvas-left-item-link" href="/">
          <div className="canvas-left-itemdiv">
            <img className="canvas-left-img" src={logoutIcon} />
            <div className="canvas-left-text">Log In</div>
          </div>
        </a>
      </div>
    </Offcanvas.Body>
      )
    }

  }
  

  return (
    <div className="row">
        <div className="row">
          <div className="col-10" style={{display: 'grid',justifyContent:'start',alignItems:'center'}}>
            <a href="/" style={{textDecoration:'none'}}>
              <h1 className="fw-bold m-3 text-light" style={{width:'fit-content'}}>Sharing Sketch</h1>
            </a>
          </div>

          <div className="col-2" style={{display: 'flex', justifyContent: 'end',alignItems: 'center'}}>
            <a href="/gallery" style={{textDecoration: 'none'}}>
              <h3 className="m-3 text-light" style={{textAlign:'right',padding:'0.5rem',border: '2px solid white',borderRadius:'3px'}}>Gallery</h3>
            </a>
            <a onClick={handleShow} style={{backgroundColor:"transparent"}}>
              <img  src={burgerIcon} style={{width: "30px"}} />
            </a>
          </div>
        </div>
        <Offcanvas show={show} onHide={handleClose} placement={'end'} className="canvas-left ">
          <ShowMemberTools username={username} />
        </Offcanvas>
    </div>
  )
}

export default Nav