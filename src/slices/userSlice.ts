import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  users: Object;
  isLoading: Boolean
}

const initialState: UserState = {
  users: {},
  isLoading: false
};


export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    receiveUsers: (state, action: PayloadAction<Object>) => {
      state.users = action.payload;
    },
    addQuestionToUser: (state, action: PayloadAction<any>) => {
      const { author, id } = action.payload;
      let user: any = state.users[author as keyof Object];
      const questions = user.questions.concat(id);
      state.users = {
        ...state.users,
        [author]: {
          ...state.users[author as keyof Object],
          questions
        }
      }
    }
  },
  extraReducers: (builder) => {
  },
});

export const { receiveUsers, addQuestionToUser } = UserSlice.actions;
export default UserSlice.reducer;