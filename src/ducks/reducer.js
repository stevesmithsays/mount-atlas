import axios from 'axios';

// CONSTANTS

// const GET_USERS = "GET_USERS";
const GET_USER = "GET_USER";

// ACTION CREATORS
export function getUser(){
    return{
        type: GET_USER,
        payload: axios
        .get('/api/test')
        .then(response => {
          return response.data;
        })
        .catch(console.log)
    }
}

// INITIAL STATE

const initialState = {
    user: [],
    isLoading: false,
    didErr: false
};

export default function reducer( state = initialState, action){
    switch(action.type) {
            case `${GET_USER}_PENDING`: 
            return Object.assign({}, state, {isloading: true})

            case `${GET_USER}_FULFILLED`:
            return Object.assign({}, state , {
                isLoading: false,
                users: action.payload
            });
            case `${GET_USER}_REJECTED`:
            return Object.assign({}, state, { isLoading: false, didErr: true});
        default:
            return state;
    }
}