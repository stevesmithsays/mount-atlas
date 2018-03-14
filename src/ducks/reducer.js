import axios from 'axios';

// CONSTANTS
const GET_USER = "GET_USER";
const GET_PRODUCTS = "GET_PRODUCTS";
const POST_TO_CART = "POST_TO_CART";
const GET_DAT_CART = "GET_DAT_CART";

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
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err)
    })
  }
}

// ADD TO CART
export function postToCart(id, description, price){
  return{
    type: POST_TO_CART,
    payload: axios
    .post('/api/postcart', {id: id, description: description, price: price}).then((res) => {
      return res.data
    }).catch(err =>{
      console.log(err)
      })
  }
}

// GET THE CART
  

// REDUCER 
export default function reducer( state = initialState, action){
  console.log(action.type)
    switch(action.type) {
      // GET_USER CASES
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
            return Object.assign({}, state, {
              isLoading: false,
              didErr: false,
              cart: action.payload
            });

            case `${POST_TO_CART}__REJECTED`:
            return Object.assign({}, state, {
              isLoading: false,
              didErr: true,
              errMessage: action.payload
            });
    // GET THE CART
            
        default:
            return state;
    }
}