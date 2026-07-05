import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

// Thunk to handle user login
export const fetchLogin = createAsyncThunk(
  'login/fetchLogin', 
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.post('/QuanLyNguoiDung/DangNhap', user);
      
      localStorage.setItem('USER_LOGIN', JSON.stringify(res.data.content));
      
      return res.data.content;
    } catch (error) {
      const errorMessage = error.response?.data?.content || "Incorrect username or password!";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  userLogin: localStorage.getItem("USER_LOGIN") 
    ? JSON.parse(localStorage.getItem("USER_LOGIN")) 
    : null,
};

const loginSlice = createSlice({ 
  name: 'login', 
  initialState,
  reducers: {
    // Log out user
    logOut: (state) => {
      localStorage.removeItem("USER_LOGIN");
      state.userLogin = null;
    },
    // Clear error message
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear old error when starting a new login attempt
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userLogin = action.payload;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const { logOut, clearError } = loginSlice.actions;
export default loginSlice.reducer;
