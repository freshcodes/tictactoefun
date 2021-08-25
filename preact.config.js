const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

export default (config, env, helpers) => {
  // Going to mock Peer.js for SSR
  if (env.ssr) {
    config.resolve.alias.peerjs = path.resolve(__dirname, 'src', 'lib', 'peerjs-mock.js')
  }

  const context = path.resolve(__dirname, 'src', 'assets')
  config.plugins.push(new CopyWebpackPlugin([{ context, from: 'robots.txt' }]))
  config.plugins.push(new CopyWebpackPlugin([{ context, from: 'browserconfig.xml' }]))
  config.plugins.push(new CopyWebpackPlugin([{ context, from: 'CNAME' }]))

  return config
}
