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
    // console.log("cart log now", typeof neededQty);
    let grabbedItem;
    
    if(this.props.cart !== undefined && this.props.cart.length !== 0){
      console.log('cart render', this.props.cart);
      grabbedItem = this.props.cart.map((curr, index) => {
        
        return (
          <div className="cart-container" key = {index}> 
            <h1 className="cart-header">Shopping Cart.</h1>
            
            <div className="image-container">

              <img src={curr.img ? require(`../../images/${curr.img}`) : null} className="product-img" alt="product images"/>

              <p className="cart-description">{curr.description}</p>
              <p className="cart-price">${curr.price}</p>          
              <p className="cart-qty">{curr.qty}</p>

              <div className="cart-selector">
              <input className="cart-input" type="number" onChange={(e) => this.qtyHandler(e.target.value, curr.order_id)}/>
              <button className="add-bttn" onClick={() =>{this.props.updateQty(neededQty, this.state.order_id)}}>
              Add Qty
              </button>    
              <button className="add-bttn">Order</button>
              <button className="add-bttn">Remove</button>
              </div>
              
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