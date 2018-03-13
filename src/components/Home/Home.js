import React, { Component } from "react";
import { connect } from "react-redux"; 
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { getProducts } from "../../ducks/reducer";


class Home extends Component {
    componentDidMount(props){
        this.props.getProducts(); 
    }
    render(){
      let productList;
      if(this.props.products.length !== undefined & this.props.products.length !==0){
        productList = this.props.products.map((curr, index) => {
          return (
            <Link to = {`/products/${index}`} key = {index}>
              <div className="products-container" key = {index}>
                  <p>{curr.Description}</p>
                  <img src={require(`../../images/${curr.img}`)} className="product-img" alt="product images"/>
              </div>
            </Link>
          )
        })
      }
      console.log(this.props.products)  
        return (
          <div>
               {productList}  
          </div>
        );
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getProducts } )(Home));