import { createSlice } from "@reduxjs/toolkit";

export const ContentEmptyState = {
  content: [],
  status: "idle",
  error: null,
};

export const contentSlice = createSlice({
  name: "content",
  initialState: ContentEmptyState,
  reducers: {
    createContent: (state, action) => (state.content = action.payload),
    modifyContent: (state, action) => ({ ...state, content: action.payload }),
    resetContent: () => ContentEmptyState,
  },
});

export const { createContent, modifyContent, resetContent } =
  contentSlice.actions;

export default contentSlice.reducer;
