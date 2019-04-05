// TODO: why do we need this again?

const presets = ["@babel/preset-typescript"];
const plugins = [
  [
    "module-resolver",
    {
      extensions: [".ts"],
      root: "."
    }
  ]
];

module.exports = { presets, plugins };
