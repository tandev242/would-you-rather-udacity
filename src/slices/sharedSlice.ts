import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { receiveUsers } from './userSlice';
import { receiveQuestions } from './questionSlice';
import API from '../utils/api';

export interface SharedState {
  isLoading: Boolean;
}

const initialState: SharedState = {
  isLoading: false
};

export const handleInitialData = createAsyncThunk(
  'shared/getInitialData',
  async (_, thunkAPI) => {
    const { users, questions } = await API.getInitialData();
    thunkAPI.dispatch(receiveUsers(users));
    thunkAPI.dispatch(receiveQuestions(questions));
  }
);


export const SharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleInitialData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleInitialData.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(handleInitialData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default SharedSlice.reducer;