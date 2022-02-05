import LandingLayout from "@/components/LandingLayout";
import { login } from "@/features/auth/authActions";
import { AppState, useAppDispatch } from "@/app/store";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: AppState) => state.auth);
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(login({ email: email, password: password }));
    setIsLoading(false);
  };

  React.useEffect(() => {
    router.prefetch("/app");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LandingLayout>
      <div className="mt-12 flex items-start justify-center">
        <form
          onSubmit={onLogin}
          className="
                  w-full
                  max-w-md
                  rounded-md
                  bg-black
                  bg-opacity-80
                  p-8
                  sm:p-16
                "
        >
          <h1 className="text-3xl font-bold text-white">Sign In</h1>

          <div className="my-6 flex flex-col space-y-4">
            <input
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              required
              className="
                      w-full
                      rounded-md
                      bg-[#333333]
                      p-4
                      text-white placeholder-[#8b8b8b]
                      ring-zinc-500
                      focus:outline-none
                      focus:ring
                    "
              type="email"
              placeholder="Email address"
              value={email}
            />

            <input
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              required
              className="
                      w-full
                      rounded-md
                      bg-[#333333]
                      p-4
                      text-white placeholder-[#8b8b8b]
                      ring-zinc-500
                      focus:outline-none
                      focus:ring
                    "
              type="password"
              placeholder="Password"
              value={password}
            />
          </div>

          {auth.error?.message && (
            <span className="text-sm text-red-400">{auth.error.message}</span>
          )}

          <button
            type="submit"
            className="
                    mt-4
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-md
                    bg-[#e50914]
                    py-4
                    px-4
                    font-bold
                    text-white
                  "
          >
            {!isLoading && <span>Sign In</span>}

            {isLoading && (
              <svg
                className="h-6 w-6 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </button>

          <div className="mt-12">
            <p className="text-zinc-500">
              New to Almost Netflix?{" "}
              <Link href="/register">
                <a className="text-white hover:underline">Sign up now</a>
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </LandingLayout>
  );
};

export default Login;
