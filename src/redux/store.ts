import { configureStore } from "@reduxjs/toolkit";
import { authApi, authSlice } from "./api/authApi";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
