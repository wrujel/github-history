/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
    dangerouslyAllowSVG: true,
  },
  webpack(config) {
    config.module.rules.push();
    return config;
  },
};

module.exports = nextConfig;
