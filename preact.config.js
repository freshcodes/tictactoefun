const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

export default (config, env, helpers) => {
  // Going to mock Peer.js for SSR
  if (env.ssr) {
    config.resolve.alias.peerjs = path.resolve(__dirname, 'src', 'lib', 'peerjs-mock.js')
  }

  config.plugins.push(new CopyWebpackPlugin({
    patterns: [
      { from: 'assets/robots.txt' },
      { from: 'assets/browserconfig.xml' },
      { from: 'assets/CNAME' }
    ]
  }))

  return config
}
