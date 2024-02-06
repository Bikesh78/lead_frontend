import { configureStore } from "@reduxjs/toolkit";
import { authApi, authSlice } from "./api/authApi";
import { leadApi } from "./api/leadApi";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(leadApi.middleware),
});
