import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getProducts } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';


class Product extends Component {
  componentDidMount(){
  }
  render(){
    console.log("this is what this.props.products is : ", this.props.match.params.id)
    let productIndex = this.props.match.params.id;
    let currentProduct = this.props.products[`${productIndex}`];
    let currentPhoto = currentProduct.img;
    let currentPrice = currentProduct.price;
    let currentBlurb = currentProduct.blurb;
    let currentDescription = currentProduct.description;

    console.log(this.props.products[`${productIndex}`]);
    console.log("product image", currentPhoto);
    console.log("currentProduct is: ",  currentProduct);
  
    return(
      <div className="product-container">
        <div className="description-container">
        <Link to="/"><img src={require(`../../images/${currentPhoto}`)} className="product-foto"/></Link>
          <p className="product-description">{currentDescription}</p>
          <p className="product-price">${currentPrice}</p>
          <p className="product-blurb">
          Straight from the Sharpie. Classy move.
          </p>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state; 

export default withRouter(connect( mapStateToProps, { getProducts })(Product));