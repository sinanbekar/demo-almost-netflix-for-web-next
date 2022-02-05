import React from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "@/app/store";
import {
  AppwriteCategory,
  AppwriteMovie,
  AppwriteService,
} from "@/services/appwrite";
import Movie from "@/components/Movie";
import { loadFavourite } from "@/features/mylist/mylistActions";

const MovieList = ({ category }: { category: AppwriteCategory }) => {
  const dispatch = useAppDispatch();
  const mylist = useSelector((state: AppState) => state.mylist);

  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  let perPage: number;
  if (width < 640) {
    perPage = 2;
  } else if (width < 768) {
    perPage = 3;
  } else if (width < 1024) {
    perPage = 4;
  } else if (width < 1280) {
    perPage = 5;
  } else {
    perPage = 6;
  }
  const [movies, setMovies] = React.useState<AppwriteMovie[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isBeforeAllowed, setIsBeforeAllowed] = React.useState(false);
  const [isAfterAllowed, setIsAfterAllowed] = React.useState(false);
  const [lastDirection, setLastDirection] = React.useState<
    "before" | "after"
  >();
  const [lastCursor, setLastCursor] = React.useState<string>();

  const isCursorAllowed = (index: number) => {
    // Simply use variables we fill during fetching data from API
    // Depending on index (direction) we want to return different variables
    if (index === 0) {
      return isBeforeAllowed;
    }
    if (index === movies.length - 1) {
      return isAfterAllowed;
    }
  };

  const reloadPage = React.useCallback(async () => {
    // Show spinners instead of arrows
    setIsLoading(true);

    // Fetch new list of movies using direction and last document ID
    const newMovies = await AppwriteService.getMovies(
      perPage,
      category,
      lastDirection,
      lastCursor
    );

    setMovies(newMovies.documents);

    // Fetch status if movie is on My List or not
    await dispatch(loadFavourite(newMovies.documents.map((d) => d.$id)));

    // Hide spinners, show arrows again
    setIsLoading(false);
  }, [dispatch, category, lastCursor, lastDirection, perPage]);

  const onPageChange = async (direction: "before" | "after") => {
    // Show spinners instead of arrows
    setIsLoading(true);

    // Use relation ID if provided
    const lastRelationId =
      direction === "before"
        ? movies[0].relationId
        : movies[movies.length - 1].relationId;

    // Depending on direction, get ID of last document we have
    let lastId = lastRelationId
      ? lastRelationId
      : direction === "before"
      ? movies[0].$id
      : movies[movies.length - 1].$id;

    // Fetch new list of movies using direction and last document ID
    const newMovies = await AppwriteService.getMovies(
      perPage,
      category,
      direction,
      lastId
    );

    // Fetch status if movie is on My List or not
    await dispatch(loadFavourite(newMovies.documents.map((d) => d.$id)));

    // Now lets figure out if we have previous and next page...
    // Let's start with saying we have them both, then we will set it to false if we are sure there isnt any
    // By setting default to true, we never hide it when we shouldnt.. Worst case scenario, we show it when we shoulding, resulsing in you seing the arrow, but taking no effect and then dissapearing
    setIsBeforeAllowed(true);
    setIsAfterAllowed(true);

    // If we dont get any documents, it means we got to edge-case when we thought there is next/previous page, but there isnt
    if (newMovies.documents.length === 0) {
      // Depending on direction, set that arrow to disabled
      if (direction === "before") {
        setIsBeforeAllowed(false);
      } else {
        setIsAfterAllowed(false);
      }
    } else {
      // If we got some documents, store them to component variable and keep both arrows enabled
      setMovies(newMovies.documents);
    }

    // If our Appwrite service says there isn' next page, then...
    if (!newMovies.hasNext) {
      // Depnding on direction, set that specific direction to disabled
      if (direction === "before") {
        setIsBeforeAllowed(false);
      } else {
        setIsAfterAllowed(false);
      }
    }

    // This system is not fully perfect, because if dataset changes while we are watching specific page, we have arrow even tho there isnt next page. Thats why we have edge-case check earlier

    // This solution also fails if document with ID we use as cursor is removed.
    // TODO: Implement fallback to next document ID in list, if first one fails. If all fails, WHAT THE HELL.

    // Store cursor and direction if I ever need to refresh the current page
    setLastDirection(direction);
    setLastCursor(lastId);

    // Hide spinners, show arrows again
    setIsLoading(false);
  };

  React.useEffect(() => {
    // When component loads, fetch movie list with defaults for pagination (no cursor)
    AppwriteService.getMovies(perPage, category).then((data) => {
      // Store fetched data into component variables
      setMovies(data.documents);
      setIsAfterAllowed(data.hasNext);
      setIsLoading(false);

      // Fetch status if movie is on My List or not
      dispatch(loadFavourite(data.documents.map((d) => d.$id)));
    });
  }, [dispatch, category, perPage]);

  React.useEffect(() => {
    if (category.collectionName === "watchlists") {
      reloadPage();
    }
  }, [category, mylist.lastManualChangeTimestamp, reloadPage]);

  return (
    <div>
      <h1 className="text-4xl text-zinc-200">{category.title}</h1>

      {movies.length > 0 && (
        <div
          className="
            relative
            mt-6 grid
            grid-cols-2
            gap-4
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
          "
        >
          {movies.map((movie, index) => (
            <div key={movie.$id} className="col-span-1">
              <Movie
                isPaginationEnabled={true}
                onPageChange={onPageChange}
                moviesLength={movies.length}
                isLoading={isLoading}
                isCursorAllowed={isCursorAllowed}
                index={index}
                movie={movie}
              />
            </div>
          ))}
        </div>
      )}

      {movies.length <= 0 && (
        <div className="relative mt-6 text-zinc-500">
          <p>This list is empty at the moment...</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
