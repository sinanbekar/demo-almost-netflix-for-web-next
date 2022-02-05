import React from "react";
import Image from "next/image";
import { useAppDispatch } from "@/app/store";
import { AppwriteMovie } from "@/services/appwrite";
import AddToMyList from "@/components/AddToMyList";
import {
  capitalizeString,
  getVerboseDate,
  getVerboseDuration,
  getSrcMainThumbnail,
} from "@/helpers/index";
import { closeModal, openFilterModal } from "@/features/modal/modalSlice";

type AppwriteMovieExtended = AppwriteMovie & {
  cast: string;
  tags: string;
  genres: string;
};

const MovieModal = ({
  movie,
}: {
  movie: AppwriteMovie | AppwriteMovieExtended;
}) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key == "Escape") {
        if (movie) {
          dispatch(closeModal());
        }
      }
    });
  }, [dispatch, movie]);

  return (
    <div className="rounded-lg bg-[#181818] text-white">
      <div
        className="relative
        aspect-video w-full
        bg-gradient-to-b
        from-black
        to-[#141414]"
      >
        <Image
          src={getSrcMainThumbnail(movie.thumbnailImageId).toString()}
          layout="fill"
          priority={true}
          alt="Cover"
          objectFit="cover"
          objectPosition="top"
          className="h-full w-full rounded-t-lg"
        />

        {/*
        <img
          src={getSrcMainThumbnail(movie.thumbnailImageId).toString()}
          alt="Cover"
          className="h-full w-full rounded-t-lg object-cover object-top"
        />
      */}
        <div
          className="
          absolute
          left-0
          bottom-0
          z-[2]
          h-10
          w-full
          bg-gradient-to-b
          from-transparent
          to-[#181818]
        "
        ></div>

        <button
          onClick={() => {
            dispatch(closeModal());
          }}
          type="button"
          className="
          absolute
          top-4
          right-4
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-[#181818]
          text-white
        "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="absolute left-4 bottom-14">
          <AddToMyList movie={movie} />
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-12 gap-y-6 md:gap-y-0 md:gap-x-6">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center justify-start space-x-2">
              <p className="font-semibold text-green-500">96% Match</p>

              <p>{getVerboseDate(movie.releaseDate)}</p>
              <div className="rounded-md border border-gray-500 px-3 py-1 text-sm">
                {movie.ageRestriction === "AR13" ? "13+" : "18+"}
              </div>
              <p>{getVerboseDuration(movie.durationMinutes)}</p>
              <div className="rounded-md border border-gray-500 px-3 py-1 text-sm">
                Full-HD
              </div>
            </div>

            <h1 className="mt-4 py-4 text-4xl font-semibold">{movie.name}</h1>

            <p className="mt-6 text-lg">{movie.description}</p>
          </div>
          <div className="col-span-12 flex flex-col space-y-4 text-sm md:col-span-4">
            <p className="text-zinc-600">
              Cast:{" "}
              {(movie as AppwriteMovieExtended).cast
                .split(", ")
                .map((cast, castIndex: number) => (
                  <button
                    key={cast}
                    onClick={() => {
                      dispatch(openFilterModal({ type: "cast", value: cast }));
                    }}
                    type="button"
                    className="text-white hover:underline"
                  >
                    {castIndex >=
                    (movie as AppwriteMovieExtended).cast.split(", ").length - 1
                      ? cast
                      : `${cast}, \u00A0`}
                  </button>
                ))}
            </p>
            <p className="text-zinc-600">
              Genres:{" "}
              {(movie as AppwriteMovieExtended).genres
                .split(", ")
                .map((genre, genreIndex: number) => (
                  <button
                    key={genre}
                    onClick={() => {
                      dispatch(
                        openFilterModal({ type: "genres", value: genre })
                      );
                    }}
                    type="button"
                    className="text-white hover:underline"
                  >
                    {genreIndex >=
                    (movie as AppwriteMovieExtended).genres.split(", ").length -
                      1
                      ? genre
                      : `${genre}, \u00A0`}
                  </button>
                ))}
            </p>
            <p className="text-zinc-600">
              This show is:{" "}
              {(movie as AppwriteMovieExtended).tags
                .split(", ")
                .map((tag, tagIndex: number) => (
                  <button
                    key={tag}
                    onClick={() => {
                      dispatch(openFilterModal({ type: "tags", value: tag }));
                    }}
                    type="button"
                    className="text-white hover:underline"
                  >
                    {tagIndex >=
                    (movie as AppwriteMovieExtended).tags.split(", ").length - 1
                      ? capitalizeString(tag)
                      : `${capitalizeString(tag)}, \u00A0`}
                  </button>
                ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
