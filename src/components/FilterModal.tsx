import React from "react";
import { Query } from "appwrite";
import {
  AppwriteCategory,
  AppwriteMovie,
  AppwriteService,
} from "@/services/appwrite";
import { useAppDispatch } from "@/app/store";
import Movie from "@/components/Movie";
import { closeFilterModal, closeModal } from "@/features/modal/modalSlice";
import { loadFavourite } from "@/features/mylist/mylistActions";

const FilterModal: React.FC<{ type: string; value: string }> = ({
  type,
  value,
}) => {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = React.useState<AppwriteMovie[]>([]);

  React.useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key == "Escape") {
        if (type) {
          dispatch(closeFilterModal());
        }
      }
    });
  }, [dispatch, type]);

  React.useEffect(() => {
    const category: AppwriteCategory = {
      title: "",
      queries: [Query.search(type, value)],
      orderAttributes: ["trendingIndex"],
      orderTypes: ["DESC"],
    };

    AppwriteService.getMovies(12, category).then((data) => {
      setMovies(data.documents);
      dispatch(loadFavourite(data.documents.map((d) => d.$id)));
    });
  }, [dispatch, type, value]);

  return (
    <div className="rounded-lg bg-[#181818] text-white">
      <div className="p-8">
        <div>
          <div className="flex w-full items-center justify-between">
            <button
              onClick={() => {
                dispatch(closeFilterModal());
              }}
              type="button"
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border-2
              border-white bg-[#181818]
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                dispatch(closeFilterModal());
                dispatch(closeModal());
              }}
              type="button"
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border-2 border-white
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
          </div>
          <h1 className="py-4 text-center text-4xl font-semibold">{value}</h1>

          <div className="relative mt-6 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <div key={movie.$id} className="col-span-1">
                {/*@ts-ignore*/}
                <Movie isPaginationEnabled={false} movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
