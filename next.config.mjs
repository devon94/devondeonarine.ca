/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.cpp$/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
