import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AppwriteMovie, AppwriteService } from "@/services/appwrite";
import { AppState, useAppDispatch } from "@/app/store";
import Modals from "@/components/Modals";
import AddToMyList from "@/components/AddToMyList";
import { getSrcMainThumbnail } from "@/helpers/index";
import { logout } from "@/features/auth/authActions";
import { openModal } from "@/features/modal/modalActions";
import { openProfileModal } from "@/features/modal/modalSlice";

const Layout: React.FC<{ isMovieLandingPage?: boolean }> = ({
  children,
  isMovieLandingPage = true,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useSelector((state: AppState) => state.auth);

  const profilePhotoUrl: string | null = auth.data.profilePhotoUrl;
  const [mainMovie, setMainMovie] = React.useState<AppwriteMovie>();

  React.useEffect(() => {
    if (auth.authenticated)
      AppwriteService.getMainMovie().then((mainMovie) =>
        setMainMovie(mainMovie)
      );
  }, [auth.authenticated]);

  const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(logout());
  };

  return (
    <div className="relative">
      <div
        className="
            absolute
            top-0
            left-0
            right-0
            z-[3]
            h-24
            bg-gradient-to-b
            from-black
            to-[rgba(0,0,0,0)]
        "
      ></div>
      <div className="mx-auto h-10 w-[calc(100%-20px)] pt-6 lg:w-[calc(100%-100px)]">
        <header
          className="
            relative
            z-[4]
            flex w-full
            flex-col
            items-center
            justify-between
            space-y-6
            sm:flex-row sm:space-y-0
          "
        >
          <section className="flex items-center justify-end space-x-10">
            <Link href="/app/movies" passHref>
              <a>
                <Image
                  src="/logo.png"
                  priority={true}
                  height={32}
                  width={76}
                  alt="Almost Netflix Logo"
                />
              </a>
            </Link>

            <div className="flex space-x-6 text-zinc-200">
              <Link href="/app/movies">
                <a
                  className={
                    router.pathname.includes("/app/movies")
                      ? "font-bold text-white"
                      : ""
                  }
                >
                  Movies
                </a>
              </Link>
              <Link href="/app/my-list">
                <a
                  className={
                    router.pathname.includes("/app/my-list")
                      ? "font-bold text-white"
                      : ""
                  }
                >
                  My List
                </a>
              </Link>
            </div>
          </section>

          <section className="flex items-center justify-end space-x-3">
            <div
              onClick={() => dispatch(openProfileModal())}
              className="relative h-8 w-8 cursor-pointer"
            >
              {profilePhotoUrl && (
                <Image
                  src={profilePhotoUrl}
                  className="rounded-md shadow-inner"
                  layout="fill"
                  alt="Profile"
                />
              )}
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="
                rounded-md
                border-2
                border-[#e50914]
                bg-[#e50914] px-8
                py-1
                text-white
              "
            >
              Log Out
            </button>
          </section>
        </header>
      </div>
      {isMovieLandingPage && (
        <div
          style={{
            backgroundImage: mainMovie
              ? `url(${getSrcMainThumbnail(
                  mainMovie.thumbnailImageId
                ).toString()})`
              : undefined,
          }}
          className="
            relative
            z-[1]
            -mt-16
            flex
            h-screen
            w-full
            items-center
            bg-gradient-to-b
            from-black
            to-[#141414]
            bg-cover bg-top
          "
        >
          {mainMovie && (
            <div
              className="
            relative
            z-[3]
            mx-auto
            w-[calc(100%-20px)]
            lg:w-[calc(100%-100px)]
          "
            >
              <div>
                <h1 className="max-w-3xl pb-6 text-center text-5xl font-semibold text-white  sm:text-left">
                  {mainMovie.name}
                </h1>
                <p className="max-w-3xl pb-6 text-center text-3xl font-light text-white  sm:text-left">
                  {mainMovie.description}
                </p>

                <div className="flex flex-col items-center space-y-3  sm:flex-row sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => dispatch(openModal(mainMovie))}
                    type="button"
                    className="
                  flex
                  items-center
                  justify-center
                  space-x-3
                  rounded-md
                  bg-white
                  px-4
                  py-4
                  text-xl
                  font-bold
                  text-[#141414]
                "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span>More info</span>
                  </button>

                  <AddToMyList
                    type="secondary"
                    hero={true}
                    size="big"
                    movie={mainMovie}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="absolute inset-0 z-[1] bg-black opacity-[60%]"></div>

          <div
            className="
              absolute
              left-0
              bottom-0
              z-[2]
              h-20
              w-full
              bg-gradient-to-b
              from-transparent
              to-[#141414]
            "
          ></div>
        </div>
      )}
      <div
        className={`relative z-[3] ${isMovieLandingPage ? "-mt-[10rem]" : ""}`}
      >
        <div className="py-12">
          <div className="mx-auto mt-6 w-[calc(100%-20px)] lg:w-[calc(100%-100px)]">
            {children}
          </div>
        </div>
      </div>
      <footer className="bg-black py-12 text-white">
        <div
          className="
                mx-auto mt-6
                flex
                w-[calc(100%-20px)]
                flex-col items-center
                justify-between
                space-y-6
                text-lg text-gray-500
                md:flex-row
                md:space-y-0
                md:space-x-6
                lg:w-[calc(100%-100px)]
              "
        >
          <p className="text-center md:text-left">
            Almost netflix - Netflix Clone for education purposes using{" "}
            <a
              className="text-white hover:underline"
              href="https://www.themoviedb.org/"
            >
              TMDB
            </a>{" "}
            data
          </p>
          <p className="text-center md:text-right">
            Check out original{" "}
            <a
              className="text-white hover:underline"
              href="https://www.netflix.com/"
            >
              Netflix.com
            </a>
          </p>
        </div>
      </footer>

      <Modals />
    </div>
  );
};

export default Layout;
