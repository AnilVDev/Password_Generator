import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import passwordService from "./passwordService";
import { logout as logoutUser } from "./userSlice";

const initialState = {
    passwordDetails : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const savePassword = createAsyncThunk('password/savePassword', async(passwordDetails, thunkAPI) => {
    try{
      const accessToken = thunkAPI.getState().user.tokens.access
      return await passwordService.savePassword(passwordDetails,accessToken);
    }catch (error){
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);    
    }
  })

  export const getAllPassword = createAsyncThunk('password/getAllPassword', async(_, thunkAPI) => {
    try{
      const accessToken = thunkAPI.getState().user.tokens.access
      return await passwordService.getAllPassword(accessToken);
    }catch (error){
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);    
    }
  }) 

  export const deletePassword = createAsyncThunk('password/deletePassword', async(id, thunkAPI) => {
    try{
      const accessToken = thunkAPI.getState().user.tokens.access
      return await passwordService.deletePassword(id,accessToken);
    }catch (error){
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);    
    }
  })

  export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        reset:(state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(savePassword.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(savePassword.fulfilled, (state,action) => {
          state.isLoading = false;
          state.isSuccess = true;

        })
        .addCase(savePassword.rejected, (state,action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(getAllPassword.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllPassword.fulfilled, (state,action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.passwordDetails = action.payload;
        })
        .addCase(getAllPassword.rejected, (state,action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          state.passwordDetails = null;
        })
        .addCase(deletePassword.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(deletePassword.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
          })
          .addCase(deletePassword.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(logoutUser.fulfilled, (state) => {
            state.passwordDetails = null; 
            state.isSuccess = false;
          });                  
  }
})

export const {reset} = passwordSlice.actions
export default passwordSlice.reducer