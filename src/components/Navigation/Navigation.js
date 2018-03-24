import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; 


const Navigation = (props) => (
  
  <nav className="site-nav">
  
    <ul id="site-list">
      <li><Link to="/" className="nav-link" id="home-link">Home</Link></li>
      <li><Link to="/about" className="nav-link" id="about-link">About</Link></li>
      <li><Link to="/blog" className="nav-link" id="blog-link">Blog</Link></li>
      <li><Link to="/favorites" className="nav-link" id="favorites-link">Faves</Link></li>
      

      {props.user.id ?
      <li><Link to="/cart" className="nav-link" id="cart-link">Cart</Link></li> : <li><li><Link to="/cart" className="nav-link" id="no-cart-link">NoCart</Link></li></li>}

      {props.user.id ? 
        <li><a href={process.env.REACT_APP_LOGOUT} className="nav-link login-link">Logout</a></li> : <li><a href={process.env.REACT_APP_LOGIN} className="nav-link login-link">Login</a></li>}         
    </ul>
  </nav> 
)



const mapStateToProps= state => state;

export default connect(mapStateToProps)(Navigation);

// <li><Link to="/videos" className="nav-link" id="videos-link">Videos</Link></li>