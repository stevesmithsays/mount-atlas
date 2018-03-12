import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import { Link } from "react-router-dom"
let greeting = "Welcome back ";

const siteLogo = require ("../../images/smile.jpg");

class Header extends Component {
  componentDidMount(){
      this.props.getUser();
  }
  render(){  
      return (
        <div>
          <header>
              <div className="logo-container">
                  <img src={siteLogo} className="site-logo" alt="site logo"/>
                  <h1>Mount Atlas</h1>
                  {this.props.user.name ? (
                    <p className="welcome-greeting">{greeting}
                    {this.props.user.name}</p>
                    ) : (
                      <h1>{this.props.errMessage}</h1> 
                    )
                  }                        
              </div>         
          </header>          
        </div>
          
      );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getUser })(Header);

// const Header = () => (
//       <header>
//             <div className="logo-container">
//                 <img src={siteLogo} className="site-logo" alt="site logo"/>
//                 <h1>Mount Atlas</h1>
//             </div>    
//       </header>
//   );
