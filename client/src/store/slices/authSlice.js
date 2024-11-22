import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../intercentions/handleAxios';
apiClient;

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: null,
  token: localStorage.getItem('token') || null,
};

const url = 'http://localhost:5000/api/';

export const registration = createAsyncThunk(
  'auth/registration',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await apiClient.post(`${url}user/registration`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error occurred');
    }
  },
);

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await apiClient.post(`${url}user/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data.message || 'Error occured');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.token = action.payload.token;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
