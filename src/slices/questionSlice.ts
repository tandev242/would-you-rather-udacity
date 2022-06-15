import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../utils/api';
import { addQuestionToUser } from './userSlice';
import { handleInitialData } from './sharedSlice';
export interface QuestionState {
  questions: Object;
  isLoading: Boolean;
}

const initialState: QuestionState = {
  questions: {
  },
  isLoading: false,
};

export const handleSaveQuestion = createAsyncThunk(
  'question/saveQuestion',
  async (payload: Object, thunkAPI) => {
    const newQuestion = await API.saveQuestion(payload);
    const { id, author } = newQuestion;
    thunkAPI.dispatch(addQuestionToUser({ id, author }));
    return newQuestion;
  }
);

export const handleSaveQuestionAnswer = createAsyncThunk(
  'question/saveQuestionAnswer',
  async (payload: any, thunkAPI) => {
    await API.saveQuestionAnswer(payload);
    thunkAPI.dispatch(handleInitialData());
  }
);

export const QuestionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    receiveQuestions: (state, action: PayloadAction<Object>) => {
      state.questions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSaveQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleSaveQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        const question = action.payload;
        state.questions = { ...state.questions, [question.id]: question }
      })
      .addCase(handleSaveQuestion.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { receiveQuestions } = QuestionSlice.actions;
export default QuestionSlice.reducer;