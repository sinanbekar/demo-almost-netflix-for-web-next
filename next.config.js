/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "appwrite.io",
      new URL(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).hostname,
    ],
  },
};

module.exports = nextConfig;
