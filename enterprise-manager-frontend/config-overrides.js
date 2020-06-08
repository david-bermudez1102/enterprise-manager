const rewireLess = require("react-app-rewire-less")

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: "worker-loader" }
  })

  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true
  })(config, env)
  return config
}
