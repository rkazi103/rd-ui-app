const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    config.resolve.alias["~"] = `${path.resolve(__dirname)}/src`;
    return config;
  },
  images: {
    domains: ["avatars.dicebear.com"],
  },
};

module.exports = nextConfig;
