import Image from "next/image";
import { useAppDispatch } from "@/app/store";
import { AppwriteMovie } from "@/services/appwrite";
import { getSrcThumbnail } from "@/helpers/index";
import AddToMyList from "@/components/AddToMyList";
import { openModal } from "@/features/modal/modalActions";

interface MovieProps {
  isPaginationEnabled: true | false;
  movie: AppwriteMovie;
  onPageChange: (direction: "before" | "after") => Promise<void>;
  moviesLength: number;
  isLoading: boolean;
  isCursorAllowed: (index: number) => boolean | undefined;
  index: number;
}

const Movie = ({
  isPaginationEnabled = false,
  onPageChange,
  moviesLength,
  isLoading,
  isCursorAllowed,
  movie,
  index = 0,
}: MovieProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => {
        dispatch(openModal(movie));
      }}
      className="relative z-[3] aspect-[1.78/1] w-full rounded-md hover:z-[4]"
    >
      <div className="absolute left-1/2 right-1/2 w-full -translate-x-1/2  -translate-y-1/2 transform">
        <div className="relative block rounded-lg  bg-gradient-to-b from-zinc-800 to-black">
          {isPaginationEnabled &&
            (index === 0 || index === moviesLength - 1) &&
            isCursorAllowed(index) && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onPageChange(index === 0 ? "before" : "after");
                }}
                className={`
                ${
                  index === 0
                    ? "left-0 bg-gradient-to-r"
                    : "right-0 bg-gradient-to-l"
                }
            group
            absolute
            -top-[1px]
            z-[5]
            flex
            h-[calc(100%+2px)]
            w-[50px]
            items-center
            justify-end
            from-black
            to-transparent
            pr-3
            text-white
            transition-all
            duration-500
            hover:w-[80px]
            group-hover:to-[rgba(0,0,0,0.5)]
          `}
              >
                <div
                  className={`transform transition-all duration-500 group-hover:scale-150 ${
                    index === 0 ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {isLoading && (
                    <svg
                      className="mr-1 h-4 w-4 animate-spin"
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
                  {!isLoading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            )}

          <div className="group relative">
            {/*
            <img
              src={getSrcThumbnail(movie.thumbnailImageId).toString()}
              className="
              aspect-[1.78/1] w-full
              rounded-none
              object-cover
              object-top
              shadow-none
              transition-all
              duration-500
              group-hover:aspect-[500/800]
              group-hover:rounded-lg
              group-hover:shadow-lg
            "
              alt="Cover"
            />
*/}

            <div
              className="
              relative
              aspect-[1.78/1]
              w-full
              rounded-none
              shadow-none
              transition-all
              duration-500
              group-hover:aspect-[500/800]
              group-hover:rounded-lg
              group-hover:shadow-lg"
            >
              <Image
                src={getSrcThumbnail(movie.thumbnailImageId).toString()}
                layout="fill"
                priority={true}
                objectFit="cover"
                objectPosition="top"
                alt="Cover"
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div onClick={(e) => e.stopPropagation()}>
                <AddToMyList size="small" movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Movie;
