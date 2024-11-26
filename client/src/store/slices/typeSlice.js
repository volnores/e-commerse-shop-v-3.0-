import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../intercentions/handleAxios';

const initialState = {
  types: JSON.parse(localStorage.getItem('types')) || [],
  isLoading: false,
  error: null,
};

const url = 'http://localhost:5000/api/';

export const getTypes = createAsyncThunk('types/getTypes', async (thunkAPI) => {
  try {
    const response = await apiClient.get(`${url}type`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error occurred');
  }
});

export const createType = createAsyncThunk('types/createType', async (typeData, thunkAPI) => {
  try {
    const response = await apiClient.post(`${url}type`, typeData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Error occurred when creating the type',
    );
  }
});

const typeSlice = createSlice({
  name: 'types',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTypes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.types = action.payload;
      state.error = null;
      localStorage.setItem('types', JSON.stringify(state.types));
    });
    builder.addCase(getTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createType.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.types = action.payload;
      state.error = null;
      localStorage.setItem('types', JSON.stringify(state.types));
    });
    builder.addCase(createType.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default typeSlice.reducer;
