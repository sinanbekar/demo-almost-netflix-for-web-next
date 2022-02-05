import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppwriteService } from "@/services/appwrite";
import { setUser, resetUser } from "@/features/auth/authSlice";

interface loginParams {
  email: string;
  password?: string | null;
  $id?: string | null;
  name?: string | null;
  profilePhoto?: URL | null;
}

interface registerParams {
  name: string;
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      email,
      password = null,
      $id = null,
      name = null,
      profilePhoto = null,
    }: loginParams,
    thunkAPI
  ) => {
    if (email && password && name === null) {
      await AppwriteService.login(email, password);
    }
    const userData = await AppwriteService.getAuth();

    if (userData) {
      $id = userData.$id;
      name = userData.name;
      if (profilePhoto === null) {
        profilePhoto = await AppwriteService.getProfilePhoto();
      }
    }

    if ($id && name && profilePhoto) {
      thunkAPI.dispatch(
        setUser({
          $id: $id,
          name: name,
          profilePhotoUrl: profilePhoto.toString(),
        })
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }: registerParams, thunkAPI) => {
    await AppwriteService.register(name, email, password);
    await thunkAPI.dispatch(login({ email: email, password: password }));
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  await AppwriteService.logout();
  thunkAPI.dispatch(resetUser());
});

/*
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string) => {
    //
  }
);
*/
