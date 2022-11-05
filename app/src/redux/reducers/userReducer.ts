import { UserType } from "../initState";
import { GET_USER_INFO } from "../types/personTypes";


export const userReducer = ( state = {} as UserType , action: any): UserType => {
    switch (action.type) {
        case GET_USER_INFO: 
        return {
            ...state,
            ...action.payload
        }
    
        default:
            return state
    }
}