import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import userService from "./userService";

// To retrieve the cookie
// const cookieUser = Cookies.get('user');
// console.log('userSlice',cookieUser)
// const user = cookieUser ? JSON.parse(cookieUser) : null;
const cookieUser = Cookies.get('user');
const parsedCookieUser = cookieUser ? JSON.parse(cookieUser) : null;
const user = parsedCookieUser ? parsedCookieUser.user : null;
const refresh = parsedCookieUser ? parsedCookieUser.refresh : null;
const access = parsedCookieUser ? parsedCookieUser.access : null;


const initialState = {
    user: user? user: null,
    tokens : {
        refresh: refresh ? refresh : null,
        access: access ? access : null
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''    
}

export const register = createAsyncThunk('user/register', async(user, thunkAPI) => {
        try {
            return await userService.register(user)
        }catch (error) {
            let errorMessage = 'An error occurred while registering the user.';
            
            if (error.response && error.response.status === 400) {
              const responseData = error.response.data;
              if (responseData) {
                if (responseData.username) {
                  errorMessage = responseData.username[0];
                } else if (responseData.email) {
                  errorMessage = responseData.email[0];
                }else if (responseData.password) { 
                  errorMessage = responseData.password[0];
              }
              }
            } else if (error.message) {
              errorMessage = error.message;
            }
      
            return thunkAPI.rejectWithValue(errorMessage);
          }
    }
)

export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
    try {
        const response = await userService.login(user);
        return response;
    } catch (error) {
        let errorMessage = 'An error occurred while logging in.';

        try {
            const data = JSON.parse(error.message);
            if (data.email) {
                errorMessage = data.email[0];
            } else if (data.password) {
                errorMessage = data.password[0];
            } else if (data.non_field_errors) {
                errorMessage = data.non_field_errors[0];
            }
        } catch (e) {
            errorMessage = error.message;
        }

        return thunkAPI.rejectWithValue(errorMessage);
    }
});

export const logout = createAsyncThunk('user/logout', async() => {
    await userService.logout()
})


export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = ''; 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true;  
        })
        .addCase(register.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(register.rejected, (state,action) => {
            // state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
            state.tokens = {
                refresh: action.payload.refresh,
                access: action.payload.access
            };
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || 'An unknown error occurred';;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.tokens = null
        })      
    }
})

export const {reset} = userSlice.actions
export default userSlice.reducer;