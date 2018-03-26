import axios from 'axios';

// CONSTANTS
const GET_USER = "GET_USER";
const GET_PRODUCTS = "GET_PRODUCTS";
const POST_TO_CART = "POST_TO_CART";
const UPDATE_QTY = "UPDATE_QTY";
const REMOVE_CART = "REMOVE_CART";
const POST_FAVORITES = "POST_FAVORITES";
const VIEW_FAVORITES = "VIEW_FAVORITES";
const DELETE_FAVORITE = "DELETE_FAVORITE"


// ALL YOUR STATE(THINGS THAT ARE DYNAMIC)
const initialState = {
  user: [],
  favorites: [],
  products: [],
  cart: [],
  isLoading: false,
  didErr: false,
  errMessage: null
};

// ACTION CREATORS
// action creators are functions return an action

// GET USERS
export function getUser(){
    return{
        type: GET_USER,
        payload: axios
        .get('/api/me')
        .then(res => {
          return res.data;
        })
        .catch(err => {
            return err.message;
        })
    }
}

//  PRODUCTS
export function getProducts(){
  return{
    type: GET_PRODUCTS,
    payload: axios
    .get('/api/getproducts')
    .then(res =>{
      return res.data;
    })
    .catch(err => {
      console.log(err)
    })
  }
}

// POST TO CART
export function postToCart( id, description, price, product_id, qty){
  return{
    type: POST_TO_CART,
    payload: axios
    .post('/api/postcart', {id:id, description: description, price: price, product_id: product_id, qty: qty }).then((res) => {
      console.log("ptc reducer", res);
      return res.data
    }).catch(err =>{
      console.log(err)
      })
  }
}

// QUANTITY PUT REQ
export function updateQty(qty, order_id){
  // console.log("hit qty", qty, "order_id", order_id);
  return{
    type: UPDATE_QTY,
    payload: axios
    .put('/api/updatecart', {
      qty: qty , order_id: order_id}).then((res) => {
      return res.data
    }).catch(err =>{
      console.log(err)
    })
  }
}

// POST FAVORITES
export function postFavorites(id){
  // console.log("post fav reducer", id)
  return{
    type: POST_FAVORITES,
    payload: axios
    .post('/api/favorites',{
      id}).then((res) => {
        return res.data
      }).catch( err => {
        console.log(err)
      })
  }
}

//DELETE FAVORITES
export function deleteFave(favdprod_id){
  console.log("delete faves reducer 1", favdprod_id)
  return{
    type: DELETE_FAVORITE,
    payload: axios
    .delete('/api/deletefave', {data:{
      favdprod_id: favdprod_id
      }  
    })
    .then(res=> {
      console.log("deletefave reducer2", res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
  }
}

// VIEW FAVORITES
export function viewFavorites(favduser_id){
  // console.log("view faves reducer", favduser_id)
  return{
    type: VIEW_FAVORITES,
    payload: axios
    .post('/api/viewfavorites', {
      favduser_id: favduser_id
    })
    .then(res => {
      // console.log("favorites reducer", res)
      return res.data;
    })
    .catch(err => {
      console.log(err);
    })
  }
}

// REDUCER 
  export default function reducer( state = initialState, action){
    console.log("hit 1", action.type)
      switch(action.type) {
        // GET_USER 
              case `${GET_USER}_PENDING`: 
              return Object.assign({}, state, {
                isLoading: true
              });

              case `${GET_USER}_FULFILLED`:
              return Object.assign({}, state , {
                isLoading: false,
                user: action.payload
              });

              case `${GET_USER}_REJECTED`:
              return Object.assign({}, state, {
                isLoading: false, 
                didErr: true,
                errMessage: action.payload
              });

      // PRODUCTS
              case `${GET_PRODUCTS}_PENDING`:
              return Object.assign({}, state, {
                isLoading: true
              });     
              
              case `${GET_PRODUCTS}_FULFILLED`:  
              return Object.assign({}, state, {
                isLoading: false,
                products: action.payload
              });

              case `${GET_PRODUCTS}_REJECTED`:
              return Object.assign({}, state, {
                isLoading: false,
                didErr: true,
                errMessage: action.payload
              });

      // POST TO CART
              case `${POST_TO_CART}_PENDING`:
              return Object.assign({}, state, {
                isLoading: true
              });

              case `${POST_TO_CART}_FULFILLED`:
              console.log("ptc", action.payload);
              return Object.assign({}, state, {
                isLoading: false,
                didErr: false,
                cart: action.payload
              });

              case `${POST_TO_CART}_REJECTED`:
              return Object.assign({}, state, {
                isLoading: false,
                didErr: true,
                errMessage: action.payload
              });

      // POST FAVORITES
              case `${POST_FAVORITES}_PENDING`:
              return Object.assign({}, state, {
                isLoading: true
              });

              case `${POST_FAVORITES}_FULFILLED`:
              // console.log(action.payload);
              return Object.assign({}, state, {
                isLoading: false,
                didErr: false,
                favorites: action.payload
              });

              case `${POST_FAVORITES}_REJECTED`:
              return Object.assign({}, state, {
                isLoading: false,
                didErr: true,
                errMessage: action.payload
              });

          // VIEW_FAVORITES
              case `${VIEW_FAVORITES}_PENDING`: 
              return Object.assign({}, state, {
                isLoading: true
              });

              case `${VIEW_FAVORITES}_FULFILLED`:
              return Object.assign({}, state , {
                isLoading: false,
                didErr: false,
                favorites: action.payload
              });

              case `${VIEW_FAVORITES}_REJECTED`:
              return Object.assign({}, state, {
                isLoading: false, 
                didErr: true,
                errMessage: action.payload
              });

      // UPDATE QTY
            case `${UPDATE_QTY}_PENDING`:        
            return Object.assign({}, state, {
              isLoading: true
            });
            
            case `${UPDATE_QTY}_FULFILLED`:
            console.log("hit for fulfilled", action.type);
            return Object.assign({}, state, {
              isLoading: false,
              didErr: false,
              cart: action.payload
            });

            case `${UPDATE_QTY}_REJECTED`:
            // console.log("reducer rejected", action.type);
            return Object.assign({}, state, {
              isLoading: false,
              didErr: true,
              errMessage: action.payload
            });

      // DELETE FAVORITE
            case `${DELETE_FAVORITE}_PENDING`:       
            return Object.assign({}, state, {
              isLoading: true
            });
            
            case `${DELETE_FAVORITE}_FULFILLED`:
            console.log("hit for fulfilled", action.type);
            return Object.assign({}, state, {
              isLoading: false,
              didErr: false,
              favorites: action.payload
            });

            case `${DELETE_FAVORITE}_REJECTED`:
            return Object.assign({}, state, {
              isLoading: false,
              didErr: true,
              errMessage: action.payload
            });                                      
          default:
              return state;
      }
  }
