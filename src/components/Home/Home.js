import React, { Component } from "react";
import { connect } from "react-redux"; 
import { withRouter } from "react-router-dom";
import { getUser } from "../../ducks/reducer";

class Home extends Component {
    componentDidMount(){
        this.props.getUser();
        console.log(this.props.user);
    }
    render(){
        return (
            <div>
                {this.props.user.name ? <h1>{this.props.user}</h1> : <h1>No User On Session</h1>}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser } )(Home));