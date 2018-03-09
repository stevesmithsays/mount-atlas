import React, { Component } from "react";
import { connect } from "react-redux"; 
import { withRouter } from "react-router-dom";

class Home extends Component {
    render(){
        return "HOME COMPONENT";
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(Home));