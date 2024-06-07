import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { routerSlice } from "@/redux/router/slice";
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
//TODO

export const store = configureStore({
  reducer: {
    //   authentication: authenticationSlice.reducer,
    router: routerSlice.reducer,
    //   duplicate: duplicateSlice.reducer,
    //   document: documentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
