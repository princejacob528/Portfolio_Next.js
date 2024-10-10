module.exports = {
  assetPrefix: "/",
};

module.exports = {
  webpack(config) {
    config.output.publicPath = `/_next/`;
    return config;
  },
};
