import {
    GET_USER_SUCCESS,
    POST_USER_SUCCESS,
    USER_ERROR,
    USER_LOADING
} from "./actioTypes"

const intialvalue = {
    isLoading : false,
    isError : false,
    users : JSON.parse(localStorage.getItem("users"))||[]
}
const reducer = (state = intialvalue,{type,payload})=>{
    console.log(type,payload)
    switch(type){
        case USER_LOADING: return{
            ...state,
            isLoading : true
        }
        case USER_ERROR : return {
            ...state,
            isLoading : false,
            isError : true
        }
        case POST_USER_SUCCESS : return{
            ...state,
            users : [...state.users,payload],
            
        }
        default : return state
    }
}

export default reducer