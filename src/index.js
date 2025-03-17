import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/gallery">
    <div className="row">
        <div className="row">
          <div className="col-10" style={{display: 'grid',justifyContent:'start',alignItems:'center'}}>
            <a href="/gallery" style={{textDecoration:'none'}}>
                <h1 className="fw-bold m-3 text-light" style={{width:'fit-content'}}>Sketch Gallery</h1>
            </a>
          </div>
          <div className="col-2" style={{display: 'grid', justifyContent: 'end',alignItems: 'center'}}>
            <a href="/" style={{textDecoration: 'none'}}>
              <h3 className="m-3 text-light" style={{textAlign:'right',padding:'0.5rem',border: '2px solid white',borderRadius:'3px'}}>Sketch</h3>
            </a>
          </div>
        </div>
        <App />
    </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
