import Layout from "@/components/Layout";
import MovieList from "@/components/MovieList";
import { AppwriteMovieCategories } from "@/services/appwrite";
import { NextPage } from "next";

const Movies: NextPage = () => {
  return (
    <Layout>
      <div>
        <div className="flex flex-col space-y-20">
          {AppwriteMovieCategories.map((category) => (
            <MovieList key={category.title} category={category} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Movies;
