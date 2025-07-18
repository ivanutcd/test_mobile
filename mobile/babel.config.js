module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "nativewind/babel"
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        }
      ],
      [
        "module-resolver",
        {
          alias: {
            "@": "./",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@components": "./components",
            "@app": "./app",
            "@src": "./src",
          },
        }
      ]
    ]
  };
};
