import { register } from "@/features/auth/authActions";
import { AppState, useAppDispatch } from "@/app/store";
import LandingLayout from "@/components/LandingLayout";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Register: NextPage = () => {
  const auth = useSelector((state: AppState) => state.auth);
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [customError, setCustomError] = React.useState<string | null>(null);

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCustomError(null);

    if (password !== rePassword) {
      setCustomError("Passwords need to match.");
    } else {
      setIsLoading(true);
      await dispatch(
        register({ name: name, email: email, password: password })
      );
      setIsLoading(false);
    }
  };

  return (
    <LandingLayout>
      <div className="mt-12 flex items-start justify-center">
        <form
          onSubmit={onRegister}
          className="w-full max-w-md rounded-md bg-black bg-opacity-80  p-8 sm:p-16"
        >
          <h1 className="text-3xl font-bold text-white">Sign Up</h1>
          <div className="my-6 flex flex-col space-y-4">
            <input
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
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
              type="text"
              placeholder="Name"
            />

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
            />

            <input
              onChange={(e) => {
                e.preventDefault();
                setRePassword(e.target.value);
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
              placeholder="Password again"
            />

            <div>
              <input
                required
                className="
                    float-left
                    mt-1
                    mr-2
                    h-5
                    w-5
                    cursor-pointer
                    appearance-none
                    rounded-sm
                    border border-[#333333] bg-[#333333] bg-contain
                    bg-center bg-no-repeat
                    align-top
                    transition
                    duration-200
                    checked:border-[#e50914] checked:bg-[#e50914]
                    focus:outline-none
                  "
                type="checkbox"
                value=""
                id="agree-terms"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="
                    pointer-events-none
                    -ml-[25px]
                    inline-block
                    h-4
                    w-4
                    text-[#333333]
                  "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>{" "}
              <label className="ml-1 inline-block text-zinc-500">
                I agree with{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  className="text-white underline"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>
          </div>

          {(auth.error?.message || customError) && (
            <span className="text-sm text-red-400">
              {customError ?? auth.error.message}
            </span>
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
            {!isLoading && <span>Sign Up</span>}

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
              Already using Almost Netflix?{" "}
              <Link href="/login">
                <a className="text-white hover:underline">Sign in now</a>
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </LandingLayout>
  );
};

export default Register;
