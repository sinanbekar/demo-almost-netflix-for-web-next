import LandingLayout from '@/components/LandingLayout';
import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <LandingLayout>
        <div className="container mx-auto">
          <div
            className="
                mt-12 flex
                flex-col
                items-center
                justify-center
                space-y-4
                text-center
              "
          >
            <h1 className="text-[100px] font-bold text-white">
              Almost Netflix
            </h1>
            <p className="text-4xl text-zinc-100">
              Almost the best Netflix clone.
            </p>
          </div>

          <div
            className="
                mx-auto mt-10
                flex
                w-full
                max-w-md
                flex-col
                space-y-3
                sm:flex-row sm:space-y-0 sm:space-x-3
              "
          >
            <Link href="/login" passHref>
              <button
                type="button"
                className="
                    w-full
                    rounded-md
                    bg-white
                    py-4
                    px-4
                    font-bold
                    text-[#e50914]
                  "
              >
                Sign In
              </button>
            </Link>

            <Link href="/register" passHref>
              <button
                type="button"
                className="
                    w-full
                    rounded-md
                    bg-[#e50914]
                    py-4
                    px-4
                    font-bold
                    text-white
                  "
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </LandingLayout>

      <div className="fixed right-[18px] bottom-[18px] z-[999]">
        <Link href="https://appwrite.io/">
          <a target="_blank">
            <Image
              width={130}
              height="100%"
              src="https://appwrite.io/images-ee/press/badge-pink-box.svg"
              alt="Built with Appwrite"
            />
          </a>
        </Link>
      </div>
    </>
  );
};

export default Home;
