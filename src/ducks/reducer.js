import axios from 'axios';

// CONSTANTS
const GET_USER = "GET_USER";
const GET_PRODUCTS = "GET_PRODUCTS";
const POST_TO_CART = "POST_TO_CART";
const UPDATE_QTY = "UPDATE_QTY";


// ALL YOUR STATE(THINGS THAT ARE DYNAMIC)
const initialState = {
  user: [],
  products: [],
  cart: [],
  isLoading: false,
  didErr: false,
  errMessage: null
};

// ACTION CREATORS
// action creators are functions return an action

// USERS
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
      console.log("reducer get prod", res.data[0].id);
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
    .post('/api/postcart', {id:id, description: description, price: price, product_id: product_id, qty: qty}).then((res) => {
      console.log("ptc reducer", res.data);
      return res.data
    }).catch(err =>{
      console.log(err)
      })
  }
}

// QUANTITY PUT REQ
export function updateQty(qty, order_id){
  console.log("hit qty", qty, "order_id", order_id);
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

// REDUCER 
  export default function reducer( state = initialState, action){
    console.log("hit", action.type)
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
              // console.log(action.payload);
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
            console.log("muthasucka rejected", action.type);
            return Object.assign({}, state, {
              isLoading: false,
              didErr: true,
              errMessage: action.payload
            });
      
          default:
              return state;
      }
  }
