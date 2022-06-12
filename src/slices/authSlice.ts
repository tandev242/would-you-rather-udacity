import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export interface AuthState {
  isAuthed: Boolean,
  userId: string
}

const initialState: AuthState = {
  isAuthed: false,
  userId: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuthed: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuthed = true;
    },
    logout: (state) => {
      state.userId = initialState.userId;
      state.isAuthed = initialState.isAuthed;
    }
  },
  extraReducers: (builder) => {
  },
});

export const { setUserAuthed, logout } = authSlice.actions;
export default authSlice.reducer;