var webpackConfig = require("@vue/cli-service/webpack.config.js");

module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],

    files: ["tests/**/*.spec.ts"],

    preprocessors: {
      "**/*.spec.ts": ["webpack", "sourcemap"]
    },

    webpack: webpackConfig,

    reporters: ["spec", "coverage"],
    coverageReporter: {
      dir: "./coverage",
      reporters: [{ type: "lcov", subdir: "." }, { type: "text-summary" }]
    },

    browsers: ["ChromeHeadless"]
  });
};
