import React, { Component } from "react";
import { connect } from "react-redux"; 
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { getProducts } from "../../ducks/reducer";
let greeting = "Welcome back ";

class Home extends Component {
    componentDidMount(){
        this.props.getProducts(); 
    }
    render(){  
        return (
          <div>
              
          </div>
        );
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getProducts } )(Home));