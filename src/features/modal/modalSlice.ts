import { AnyAction, createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { openModal } from "@/features/modal/modalActions";
import { AppwriteMovie } from "@/services/appwrite";

const initialState: {
  openedMovie: AppwriteMovie | null;
  openedFilter: { type: string; value: string } | null;
  showProfileModal: boolean | null;
} = {
  openedMovie: null,
  openedFilter: null,
  showProfileModal: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state: Draft<any>): void => {
      state.openedMovie = null;
    },

    closeFilterModal: (state: Draft<any>): void => {
      state.openedFilter = null;
    },

    openFilterModal: (
      state,
      action: PayloadAction<{ type: string; value: string } | null>
    ): void => {
      state.openedFilter = action.payload;
    },

    openProfileModal: (state: Draft<any>): void => {
      state.showProfileModal = true;
    },

    closeProfileModal: (state: Draft<any>): void => {
      state.showProfileModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      openModal.fulfilled,
      (
        state: Draft<any>,
        action: PayloadAction<{ movie: AppwriteMovie } | null>
      ): void => {
        state.openedMovie = action.payload?.movie;
      }
    );
    builder.addCase(openModal.rejected, (state: Draft<any>): void => {
      state.openedMovie = null;
    });
  },
});

export const {
  openFilterModal,
  closeFilterModal,
  closeModal,
  closeProfileModal,
  openProfileModal,
} = modalSlice.actions;
