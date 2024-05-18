// const TerserPlugin = require('terser-webpack-plugin');

// /**
//  * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
//  **/
// const nextConfig = {
//   webpack: (
//     config,
//     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
//   ) => {
//     config.optimization.minimizer = [
//       new TerserPlugin({
//         terserOptions: {
//           keep_classnames: true,
//         },
//       }),
//     ];

//     return config;
//   },
// };

/**
 * The below works!
 */

module.exports = {
  // ... rest of the configuration.
  output: "standalone",
  reactStrictMode: false,
  // experimental: {
  //   serverMinification: false,
  // },
  // swcMinify: false,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.optimization.minimize = false
    return config
  },
};
