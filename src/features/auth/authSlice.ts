import { AnyAction, createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { login, logout, register } from "@/features/auth/authActions";

interface initialAuthStateProps {
  data: {
    $id: string | null;
    name: string | null;
    profilePhotoUrl: string | null;
  };
  authenticated: boolean | null;
  loading: boolean;
  error: any | null;
}

const initialState: initialAuthStateProps = {
  data: {
    $id: null,
    name: null,
    profilePhotoUrl: null,
  },
  authenticated: null,
  loading: true,
  error: null,
};

const handleStatus =
  ({
    loading = false,
    authenticated = null,
  }: {
    loading?: boolean;
    authenticated?: boolean | null;
  }) =>
  (state: Draft<any>, action: AnyAction): void => {
    if (action.meta.requestStatus === "rejected" && action.error) {
      state.error = action.error;
    } else {
      state.error = null;
    }
    state.authenticated = authenticated;
    state.loading = loading;
  };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.data.$id = action.payload?.$id || null;
      state.data.name = action.payload?.name || null;
      state.data.profilePhotoUrl = action.payload?.profilePhotoUrl || null;
      state.authenticated = action.payload.$id ? true : false;
      state.loading = false;
      state.error = null;
    },

    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, handleStatus({ loading: true }));
    builder.addCase(login.fulfilled, handleStatus({ authenticated: true }));
    builder.addCase(login.rejected, handleStatus({ authenticated: false }));

    builder.addCase(register.pending, handleStatus({ loading: true }));
    builder.addCase(register.fulfilled, handleStatus({ authenticated: true }));
    builder.addCase(register.rejected, handleStatus({}));

    builder.addCase(logout.pending, handleStatus({ loading: true }));
    builder.addCase(logout.fulfilled, handleStatus({ authenticated: false }));
    builder.addCase(logout.rejected, handleStatus({}));
  },
});

export const { setUser, resetUser } = authSlice.actions;
