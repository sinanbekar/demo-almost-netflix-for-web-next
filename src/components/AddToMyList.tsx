import React from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "@/app/store";
import { AppwriteMovie } from "@/services/appwrite";
import { toggleFavourite } from "@/features/mylist/mylistActions";

interface AddToMyListProps {
  movie: AppwriteMovie;
  type?: string;
  size?: string;
  hero?: boolean;
}

const AddToMyList = ({
  movie,
  type = "primary",
  size = "medium",
  hero = false,
}: AddToMyListProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const mylist = useSelector((state: AppState) => state.mylist);

  const isFavourite = (movieId: string) => {
    return mylist.favouriteIds.includes(movieId);
  };

  const onToggleFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLoading(true);
    dispatch(toggleFavourite(movie.$id)).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div>
      <button
        onClick={onToggleFavourite}
        type="button"
        className={`flex items-center justify-center space-x-2 rounded-md font-bold transition-all duration-300
        ${
          type === "primary"
            ? "hover:!bg-[rgba(255,255,255,0.8) bg-white  text-[#141414]"
            : "bg-zinc-500 bg-opacity-75 text-white hover:!bg-opacity-50"
        }

        ${
          size === "small"
            ? "text-sm"
            : size === "large"
            ? "text-xl"
            : "text-lg"
        }

        ${hero ? "px-4 py-4" : "px-2 py-2"}
        `}
      >
        {!isLoading && !isFavourite(movie.$id) && (
          <svg
            className={
              size === "small"
                ? "h-4 w-4"
                : size === "big"
                ? "h-6 w-6"
                : "h-5 w-5"
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        )}

        {!isLoading && isFavourite(movie.$id) && (
          <svg
            className={
              size === "small"
                ? "h-4 w-4"
                : size === "big"
                ? "h-6 w-6"
                : "h-5 w-5"
            }
            xmlns="http://www.w3.org/2000/svg"
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
          </svg>
        )}

        {isLoading && (
          <svg
            className={`animate-spin ${
              size === "small"
                ? "h-4 w-4"
                : size === "big"
                ? "h-6 w-6"
                : "h-5 w-5"
            }`}
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

        <span>
          {isFavourite(movie.$id) ? "Remove from My List" : "Add to My List"}
        </span>
      </button>
    </div>
  );
};

export default AddToMyList;
