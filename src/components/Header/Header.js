import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
// import { Link } from "react-router-dom"
let greeting = "Hey there ";

// const siteLogo = require ("../../images/cupOJoe.jpg");

class Header extends Component {
  componentDidMount(){
      this.props.getUser();
  }
  render(){  
      return (
        <div>
          <header>
              <div className="logo-container">
            
                  <div id="atlas-logo">
                    <h1>Mount <br/> Atlas.</h1>
                    <div className="shape-holder">
                      <div id ="parallelogram"></div>
                      <div id ="parallelogram2"></div>
                      <div id ="parallelogram3"></div>
                      <div id ="parallelogram4"></div>
                    </div>
                  </div>

                  {this.props.user.name ? (
                    <p id="welcome-greeting">{greeting}
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
