import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { AppState } from "@/app/store";

const Home: NextPage = () => {
  const router = useRouter();
  const auth = useSelector((state: AppState) => state.auth);

  if (typeof window !== "undefined" && auth.authenticated) {
    router.push("/app/movies");
  }

  return <></>;
};

export default Home;
