import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Slice/userSlice'
import passwordReducer from '../Slice/passwordSlice'
 
export const store = configureStore({
    reducer : {
        user : userReducer,
        password : passwordReducer
    }
})