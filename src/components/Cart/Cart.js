import React, { Component } from "react";
import { connect } from "react-redux";
import { getDatCart } from "../../ducks/reducer";




class Cart extends Component {
  componentDidMount(){
    this.props.getDatCart();
  }
  render(){
    console.log("cart log baby" , this.props.cart);
    let grabbedItem;
    
    if(this.props.cart.length !== undefined && this.props.cart.length !== 0){
      grabbedItem = this.props.cart.map((curr, index) => {
        return (
          <div>
            <h1>{curr.description}</h1>
          </div>)
      })
    }
    return(
      <div>
        Cart Component
        {grabbedItem}
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getDatCart})(Cart);