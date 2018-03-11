// IF JUST RENDERING JSX NO STATE NEEDED.
// STATE IS NEEDED USE CLASS BASED COMPONENT.
import React from "react";
// import { Link } from 'react-router-dom';
const siteLogo = require ("../../images/smile.jpg");


const Header = () => (
    <header>
          <div className="logo-container">
              <img src={siteLogo} className="site-logo" alt="site logo"/>
              <h1>Mount Atlas</h1>
          </div>
    </header>
)


export default Header;
