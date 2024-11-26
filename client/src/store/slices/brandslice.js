import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../intercentions/handleAxios';

const initialState = {
  brands: JSON.parse(localStorage.getItem('brands')) || [],
  isLoading: false,
  error: null,
};

const url = 'http://localhost:5000/api/';

export const getBrands = createAsyncThunk('brand/getBrands', async (thunkAPI) => {
  try {
    const response = await apiClient.get(`${url}brand`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error occurred');
  }
});

export const createBrand = createAsyncThunk('brand/createBrand', async (brandData, thunkAPI) => {
  try {
    const response = await apiClient.post(`${url}brand`, brandData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Error occurred when creating the brand',
    );
  }
});

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      state.brands = action.payload;
      state.error = null;
      localStorage.setItem('brands', JSON.stringify(state.brands));
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createBrand.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createBrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.brands = action.payload;
      state.error = null;
      localStorage.setItem('brands', JSON.stringify(state.brands));
    });
    builder.addCase(createBrand.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default brandSlice.reducer;
