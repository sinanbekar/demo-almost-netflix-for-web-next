import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AppState } from "@/app/store";


const AuthCheck: React.FC = ({ children }) => {
  const auth = useSelector((state: AppState) => state.auth);
  const router = useRouter();

  const currentRouteAppPath = router.pathname.includes("/app");
  const currentRoutePublicPath =
    router.pathname !== "/_error" && !router.pathname.includes("/app");

  React.useEffect(() => {
    if (currentRoutePublicPath) {
      if (!auth.loading && auth.authenticated) {
        router.push("/app");
      }
    } else if (currentRouteAppPath) {
      if (!auth.loading && !auth.authenticated) {
        router.push("/");
      }
    }
  }, [
    auth.loading,
    auth.authenticated,
    router,
    currentRouteAppPath,
    currentRoutePublicPath,
  ]);

  if (
    ((auth.loading || auth.authenticated) && currentRoutePublicPath) ||
    ((auth.loading || !auth.authenticated) && currentRouteAppPath)
  ) {
    return <></>;
  }

  return  (children as React.ReactElement);
};

export default AuthCheck;
