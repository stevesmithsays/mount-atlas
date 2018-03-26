import React, { Component } from "react";
import { connect } from "react-redux"; 
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { getProducts, postToCart, postFavorites } from "../../ducks/reducer";


class Home extends Component {
    componentDidMount(props){
        this.props.getProducts(); 
    }
    render(){
      let id = this.props.user.id;
      let description = this.props.products;
      let price = this.props.products;
      // let productID= this.props.products[0];
      
      let productList;

      if(this.props.products.length !== undefined && this.props.products.length !==0){
        productList = this.props.products.map((curr, index) => {
          return (
              <div className="product-box" key = {index}>
                  <Link to = {`/product/${index}`} key = {index}>
                    <img src={require(`../../images/${curr.img}`)} className="product-photo" alt="product images"/>  
                  </Link>                              
                  
                    <div className="prod-thing">
                      <p>{curr.description}</p>
                      <p>${curr.price}</p>
                      </div>

                    <Link to="/Cart">                    
                      <button className="add-btn" onClick={() => this.props.postToCart(curr.order_id, curr.description, curr.price, curr.id, curr.qty)}>Send It
                      </button>                
                    </Link>   
                    <Link to="/Favorites"><button className="add-btn" onClick={() =>  this.props.postFavorites(curr.id)}>Favorite</button>
                    </Link>
              </div>
          )
        })
      }
      
        return (
          <div className="shop">
            <div className="shop-container">
                {productList}  
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getProducts, postToCart, postFavorites } )(Home));

// <Link to = {`/products/${index}`} key = {index}>