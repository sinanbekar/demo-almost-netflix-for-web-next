import React from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "@/app/store";
import { AppwriteService } from "@/services/appwrite";
import { logout, login } from "@/features/auth/authActions";

export function useUserListener() {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: AppState) => state.auth);
  React.useEffect(() => {
    AppwriteService.getAuth().then((user) => {
      if (user && !auth.authenticated) {
        dispatch(login({ email: user.email, $id: user.$id, name: user.name }));
      }
      if (!user) {
        dispatch(logout());
      }
    });
  }, [dispatch]);
}
