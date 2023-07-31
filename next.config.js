/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["cdn.imagin.studio"],
//   },
// };

// module.exports = nextConfig;

// const withPWA = require("next-pwa");

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
// });

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/manifest.json$/],
});

const nextConfig = {
  images: {
    domains: ["cdn.imagin.studio"],
  },
};

module.exports = withPWA;
module.exports = nextConfig;
