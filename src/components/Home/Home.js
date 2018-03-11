import React, { Component } from "react";
import { connect } from "react-redux"; 
import { withRouter } from "react-router-dom";
import { getUser } from "../../ducks/reducer";

class Home extends Component {
    componentDidMount(){
        this.props.getUser();
        console.log(this.props);    
    }
    render(){
        return (
            <div>
                {this.props.user.name ? (
                    <div>
                        <h1>{this.props.user.authid}</h1>  
                        <h1>{this.props.user.name}</h1>
                     </div> 
                    ) : (
                        <h1>{this.props.errMessage}</h1>                        
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser } )(Home));