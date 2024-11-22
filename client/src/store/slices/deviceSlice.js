import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../intercentions/handleAxios';

const initialState = {
  devices: JSON.parse(localStorage.getItem('devices')) || [],
  selectedDeviceID: JSON.parse(localStorage.getItem('devices/id')) || null,
  isLoading: false,
  error: null,
};

const url = 'http://localhost:5000/api/';

export const getDevices = createAsyncThunk('devices/getAll', async (thunkAPI) => {
  try {
    const response = await apiClient.get(`${url}device`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error occurred');
  }
});

export const createDevice = createAsyncThunk('devices/create', async (deviceData, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await apiClient.post(`${url}device`, deviceData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Error occurred when creating the device',
    );
  }
});

export const getDeviceId = createAsyncThunk('devices/getIdPage', async (id, thunkAPI) => {
  try {
    const response = await apiClient.get(`${url}/device/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Error occurred while fetching the device',
    );
  }
});

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDevices.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getDevices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.devices = action.payload;
      state.error = null;
      localStorage.setItem('devices', JSON.stringify(action.payload));
    });
    builder.addCase(getDevices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createDevice.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createDevice.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log('Created device:', action.payload);
      state.devices.push(action.payload);
      state.error = null;
      localStorage.setItem('devices', JSON.stringify(state.devices));
    });
    builder.addCase(createDevice.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getDeviceId.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getDeviceId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedDeviceID = action.payload;
      state.error = null;
    });
    builder.addCase(getDeviceId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default deviceSlice.reducer;
