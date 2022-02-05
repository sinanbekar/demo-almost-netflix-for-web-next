import LandingLayout from '@/components/LandingLayout';
import { NextPage } from 'next';
import Link from 'next/link';

const TermsAndConditions: NextPage = () => {
  return (
    <LandingLayout>
      <div className="mt-12 flex items-start justify-center">
        <form className="w-full max-w-md rounded-md bg-black bg-opacity-80 p-8 sm:p-16">
          <h1 className="text-center text-lg font-light text-white">
            Just kidding, no terms and conditions here. If you like the project,
            please drop us a star on{' '}
            <Link href="https://github.com/appwrite/appwrite">
              <a className="font-semibold underline">GitHub</a>
            </Link>
            .
          </h1>
          <div className="mt-12">
            <p className="text-center text-zinc-500">
              New to Almost Netflix?{' '}
              <Link href="/register">
                <a className="text-white hover:underline">Sign up now</a>
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </LandingLayout>
  );
};

export default TermsAndConditions;
