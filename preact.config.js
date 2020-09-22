const CopyWebpackPlugin = require('copy-webpack-plugin')

export default (config, env, helpers) => {
  // Going to mock Peer.js for SSR
  if (env.ssr) {
    config.resolve.alias.peerjs = `${__dirname}/src/lib/peerjs-mock.js`
  }

  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: 'robots.txt' }]))
  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: 'browserconfig.xml' }]))
  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: 'CNAME' }]))

  return config
}
