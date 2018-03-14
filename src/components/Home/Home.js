import React, { Component } from "react";
import { connect } from "react-redux"; 
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { getProducts } from "../../ducks/reducer";
import { postToCart } from "../../ducks/reducer";


class Home extends Component {
    componentDidMount(props){
        this.props.getProducts(); 
    }
    render(){
      console.log("again from home" , this.props);

      let id = this.props.user.id;
      let description = this.props.products;
      let price = this.props.products;
      
      let productList;

      if(this.props.products.length !== undefined && this.props.products.length !==0){
        productList = this.props.products.map((curr, index) => {
          return (
            <div className="products-container" key = {index}>

                <Link to = {`/products/${index}`} key = {index}>
                  <img src={require(`../../images/${curr.img}`)}        className="product-img rotated" alt="product images"/>  
                </Link>                              
                
                  <p className="prod-description">{curr.description}</p>
                  <p className="prod-price">{curr.price}</p>

                  <Link to="/Cart"><button onClick={() => this.props.postToCart(id, curr.description, curr.price)}>smash
                  </button></Link>

            </div>
          )
        })
      }
      
        return (
          <div>
               {productList}  
          </div>
        );
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getProducts, postToCart } )(Home));

// <Link to = {`/products/${index}`} key = {index}>