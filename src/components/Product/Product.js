import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';

class Product extends Component {
  componentDidMount(props){
    this.props.getProducts();
  }
  render(){
    console.log("product", this.props.products.length)
    let selectedProduct;
    
    return(
      <div></div>
    )
  }
}

const mapStateToProps = state => state; 

export default withRouter(connect( mapStateToProps, { getProducts })(Product));