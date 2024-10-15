import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./states/user";
import { contentSlice } from "./states/content";
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    videos: contentSlice.reducer,
  },
});
