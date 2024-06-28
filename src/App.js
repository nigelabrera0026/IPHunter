/**
 * @author Nigel Abrera
 * @description Creating an IP Tracker that is fetched from an API and developing it in React
 * @date 10/16/2023
 * @updated 10/27/2023
 */

import React from "react";
import Main from "./Main";
import image from "./images/IP_address_icon.png";
import "./styles/styles.css";

export default function App() {
  return (
    <div className="container"> 
      <div className="header">
          <img src={image} alt="Logo" id="nav-bar-logo"/>
          <nav>
              <ul className="nav">   
                  <li className="nav-item">IP Hunter</li>
              </ul>
          </nav>
      </div>
      <Main className="main"/>
      <div className="footer">
            <footer>
                Created by Nigel Abrera
            </footer>
        </div>
    </div>
  );
}

