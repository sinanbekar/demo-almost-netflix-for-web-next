import { AppState } from "@/app/store";
import { AppwriteService } from "@/services/appwrite";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFavourite,
  removeFavourite,
  updateLastAction,
} from "@/features/mylist/mylistSlice";

export const loadFavourite = createAsyncThunk(
  "mylist/loadFavourites",
  async (movieIds: string[], thunkAPI) => {
    const { mylist } = thunkAPI.getState() as AppState;
    for (const favouriteId of await AppwriteService.getOnlyMyList(movieIds)) {
      if (!mylist.favouriteIds.includes(favouriteId)) {
        thunkAPI.dispatch(addFavourite(favouriteId));
      }
    }
  }
);

export const toggleFavourite = createAsyncThunk(
  "mylist/toggleFavourite",
  async (movieId: string, thunkAPI) => {
    const { mylist } = thunkAPI.getState() as AppState;

    if (mylist.favouriteIds.includes(movieId)) {
      if (await AppwriteService.deleteFromMyList(movieId)) {
        thunkAPI.dispatch(removeFavourite(movieId));
      }
    } else {
      if (await AppwriteService.addToMyList(movieId)) {
        thunkAPI.dispatch(addFavourite(movieId));
      }
    }

    thunkAPI.dispatch(updateLastAction());
  }
);
