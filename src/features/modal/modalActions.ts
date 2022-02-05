import { createAsyncThunk } from "@reduxjs/toolkit";
import { closeModal, closeFilterModal } from "@/features/modal/modalSlice";
import { AppwriteMovie } from "@/services/appwrite";
import { AppState } from "@/app/store";

export const openModal = createAsyncThunk(
  "modal/openModal",
  async (movie: AppwriteMovie, thunkAPI) => {
    const { modal } = thunkAPI.getState() as AppState;

    if (modal.openedMovie) {
      thunkAPI.dispatch(closeModal());
      thunkAPI.dispatch(closeFilterModal());

      await new Promise((pRes) => {
        setTimeout(() => {
          pRes(true);
        }, 500);
      });
    }
    return { movie };
  }
);
