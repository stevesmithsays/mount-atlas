import axios from 'axios';

// CONSTANTS

const GET_USER = "GET_USER";
const GET_PRODUCTS = "GET_PRODUCTS";


const initialState = {
  user: [],
  products: [],
  isLoading: false,
  didErr: false,
  errMessage: null
};

// ACTION CREATORS

// users
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
      return err.message
    })
  }
}

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
        default:
            return state;
    }
}