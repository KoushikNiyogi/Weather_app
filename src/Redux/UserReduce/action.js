import {
    GET_USER_SUCCESS,
    POST_USER_SUCCESS,
    USER_ERROR,
    USER_lOADING
} from "./actioTypes"

export const registerUser =  (details)=>(dispatch)=>{
   dispatch({type : POST_USER_SUCCESS, payload : details})
}