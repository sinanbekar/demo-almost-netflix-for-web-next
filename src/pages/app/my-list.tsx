import Layout from "@/components/Layout";
import MovieList from "@/components/MovieList";
import { AppwriteCategory } from "@/services/appwrite";
import { NextPage } from "next";

const MyList: NextPage = () => {
  const category: AppwriteCategory = {
    collectionName: "watchlists",
    title: "Movies in My List",
    queries: [],
    orderAttributes: [],
    orderTypes: [],
  };

  return (
    <Layout isMovieLandingPage={false}>
      <div>
        <div className="flex flex-col space-y-20">
          <MovieList key={category.title} category={category} />
        </div>
      </div>
    </Layout>
  );
};

export default MyList;
