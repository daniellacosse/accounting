// Unfortunately, we need to mainatain a separate babel file for running Jest tests...

const presets = [
  ["@babel/preset-env", { targets: { esmodules: true } }],
  "@babel/preset-typescript"
];
const plugins = [
  [
    "module-resolver",
    {
      extensions: [".ts"],
      root: "."
    }
  ],
  "convert-to-json"
];

module.exports = { presets, plugins };
