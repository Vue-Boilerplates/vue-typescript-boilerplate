/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin"); // for moment tree shaking locales
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
  publicPath: "/",
  runtimeCompiler: true,
  productionSourceMap: process.env.NODE_ENV !== "production",
  crossorigin: "use-credentials",
  lintOnSave: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "source-map";
    } else if (process.env.NODE_ENV === "test") {
      config.devtool = "cheap-module-eval-source-map";
    }
  },
  chainWebpack: (config) => {
    // for moment tree shaking locales
    config.resolve.alias.set("moment", "moment/moment.js");

    // these settings apply to production or development, but will break mocha tests in the test NODE_ENV
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "development"
    ) {
      // By default vue-cli sets rel=prefetch on chunks-vendor.js and app.js in the index.html that gets generated in index.html.
      // This setting removes vue-cli's this default so we can use more chunks and let them be loaded dynamically.
      config.plugins.delete("prefetch");
      config.plugin("prefetch").use(PreloadWebpackPlugin, [
        {
          rel: "prefetch",
          include: "asyncChunks",
          // do not prefetch async routes
          fileBlacklist: [/myasyncRoute(.)+?\.js$/, /\.map$/],
        },
        {
          rel: "preload",
          include: "initial",
          fileWhitelist: [/(^@vue)(.*)(\.js$)/, /(^vue)(.*)(\.js$)/],
          // do not preload map files or hot update files
          fileBlacklist: [/\.map$/, /hot-update\.js$/],
        },
      ]);

      // override vue's default chunks because their chunking is too big.
      config.optimization.delete("splitChunks");
      config.optimization.set("splitChunks", {
        cacheGroups: {
          // Vue modules
          vue: {
            test: /[\\/]node_modules[\\/](@vue.*|vue.*)[\\/]/,
            name: "vue",
            enforce: true,
            priority: 20,
            chunks: "initial",
          },
          // all other modules modules
          vendors: {
            name: "chunk-vendors",
            test(module, chunks) {
              // `module.resource` contains the absolute path of the file on disk.
              // Note the usage of `path.sep` instead of / or \, for cross-platform compatibility.
              const path = require("path");
              return (
                module.resource &&
                !module.resource.includes(
                  `${path.sep}node_modules${path.sep}@vue`
                ) &&
                !module.resource.includes(
                  `${path.sep}node_modules${path.sep}vue`
                ) &&
                !module.resource.includes(`${path.sep}src${path.sep}`)
              );
            },
            maxSize: 500000,
            priority: 10,
            enforce: true,
            chunks: "all", // doesn't get created without 'all' here
          },
          // default common chunk settings from Vue
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: 5,
            chunks: "initial",
            reuseExistingChunk: true,
          },
        },
      });

      // Webpack includes a small piece of runtime code that gets inserted into the last chunk created. This could cause our vendor
      // chunk to change unnecessarily. So the next line causes this runtime to be put in a separate file.
      config.optimization.set("runtimeChunk", true);
    }

    if (process.env.NODE_ENV === "production") {
      // for moment tree shaking locales
      // Include only 'en-us' (which is always included) and 'es-us' locales
      config
        .plugin("moment")
        .use(MomentLocalesPlugin, [
          {
            localesToKeep: ["es-us"],
          },
        ])
        .use(
          new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
          })
        );
    }
  },
};
