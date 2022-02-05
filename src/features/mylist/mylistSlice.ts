import { AnyAction, createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";

const initialState: {
  favouriteIds: string[];
  lastManualChangeTimestamp: number;
} = {
  favouriteIds: [],
  lastManualChangeTimestamp: 0,
};

export const mylistSlice = createSlice({
  name: "mylist",
  initialState,
  reducers: {
    addFavourite: (state: Draft<any>, action: PayloadAction<string>): void => {
      if (!state.favouriteIds.includes(action.payload)) {
        state.favouriteIds.push(action.payload);
      }
    },
    removeFavourite: (
      state: Draft<any>,
      action: PayloadAction<string>
    ): void => {
      state.favouriteIds = state.favouriteIds.filter(
        (id: string) => id !== action.payload
      );
    },
    updateLastAction: (state: Draft<any>): void => {
      state.lastManualChangeTimestamp = Date.now();
    },
  },
  //  extraReducers: (builder) => {},
});

export const { addFavourite, removeFavourite, updateLastAction } =
  mylistSlice.actions;
