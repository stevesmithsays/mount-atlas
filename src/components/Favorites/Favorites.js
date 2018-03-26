import React, { Component } from "react";
import { connect } from "react-redux"; 
import { viewFavorites, postFavorites, deleteFave } from "../../ducks/reducer";


class Favorites extends Component{
  constructor(props){
    super(props);
    
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount(props){
    this.props.viewFavorites(this.props.user.id);
    console.log("cdm fave", this.props)
  }

  handleDelete = (favdprod_id) => {
    this.props.deleteFave(favdprod_id)
    this.props.viewFavorites(this.props.user.id)
  }
  render(){
    let favoritesList;
 
    if(this.props.favorites.length !== undefined && this.props.favorites.length !==0){
      console.log("this is favorites.id", this.props);
      favoritesList = this.props.favorites.map((curr, index) => {
        
        return(
          <div className="favorites-body" key={index}>
            <div className="favorites-container">
            <h1>Favorites.</h1>

            <img src={curr.img ? require(`../../images/${curr.img}`) : null} className="product-img" alt="product images"/>

              <span className="favorites-description">{curr.description}</span>
              <span>{curr.favdprod_id}</span>
              <span className="cart-price">${curr.price}</span>          
              <span className="cart-qty">{curr.qty}</span>

            <div className="cart-selector">                     
              <button className="add-bttn" onClick={() => {this.handleDelete(curr.favdprod_id)}}>Remove</button>
            </div>
            </div>
          </div>
        )
      })
    }else{
      return null;
    }
    return(
        <div>
            {favoritesList}      
        </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { viewFavorites , postFavorites, deleteFave } )(Favorites);

