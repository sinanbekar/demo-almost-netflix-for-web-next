import { useDispatch } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import {
  Action,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { authSlice } from "@/features/auth/authSlice";
import { modalSlice } from "@/features/modal/modalSlice";
import { mylistSlice } from "@/features/mylist/mylistSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      modal: modalSlice.reducer,
      mylist: mylistSlice.reducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type ThunkAppDispatch = ThunkDispatch<AppState, void, Action>;
export type AppDispatch = ReturnType<AppStore["dispatch"]>;
export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();
export const wrapper = createWrapper<AppStore>(makeStore);
