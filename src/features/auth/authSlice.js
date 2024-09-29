import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://recruitment-api.pyt1.stg.jmr.pl/login', userData);
      
      // Check if the API returned a success status
      if (response.data.status === 'ok') {
        return response.data;  // Success case, return the response
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      // Handle network or unexpected errors
      return rejectWithValue('An error occurred. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, error: null, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // Assume login success if "status" is "ok"
        // In this case, no user or token is present, so we don't store them
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Store the error message
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
