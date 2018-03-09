import axios from 'axios';

// CONSTANTS

const GET_USERS = "GET_USERS";

// ACTION CREATORS

export function getUsers(){
    return{
        type: GET_USERS,
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
    users: [],
    isLoading: false,
    didErr: false
};

export default function reducer( state = initialState, action){
    switch(action.type) {
        case `${GET_USERS}_PENDING`: 
            return Object.assign({}, state, {isloading: true})

            case `${GET_USERS}_FULFILLED`:
            return Object.assign({}, state , {
                isLoading: false,
                users: action.payload
            });
            case `${GET_USERS}_REJECTED`:
            return Object.assign({}, state, { isLoading: false, didErr: true});
        default:
            return state;
    }
}