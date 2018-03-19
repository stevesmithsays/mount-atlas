import React, { Component } from "react";
import { connect } from "react-redux";
import { updateQty } from "../../ducks/reducer";

class Cart extends Component {
    constructor(){
      super()
      this.state = {
        qty: [],
        order_id: []
      }
      this.qtyHandler = this.qtyHandler.bind(this);
    }
      qtyHandler (qty, order_id) {
        this.setState({
          qty: qty,
          order_id: order_id
        })
        console.log( qty, this.state.order_id);
      }
  render(){
    let neededQty = parseInt(this.state.qty);
    console.log("cart log now", typeof neededQty);
    let grabbedItem;
  
    if(this.props.cart !== undefined && this.props.cart.length !== 0){
      grabbedItem = this.props.cart.map((curr, index) => {
        
        return (
          <div className="cart-container" key = {index}> 
            <h1 className="cart-header">Shopping Cart</h1>
            <p className="cart-description">{curr.description}</p>
            <p className="cart-price">${curr.price}</p>

            <div className="image-container">
              <img src={curr.img ? require(`../../images/${curr.img}`) : null} className="product-img rotated" alt="product images"/>
              <p className="cart-qty">Quantity{curr.qty}</p>
              <input className="cart-input" type="number" onChange={(e) => this.qtyHandler(e.target.value, curr.order_id)}/>
              <button onClick={() =>{this.props.updateQty(neededQty, this.state.order_id)}}>
              Add Qty
              </button>    
              <button>Remove</button>
            </div>
          </div>)
      })
    }
    return(
      
        <div>
          {grabbedItem}
        </div>
      
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{ updateQty })(Cart);