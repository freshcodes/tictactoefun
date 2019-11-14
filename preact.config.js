const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

export default (config, env, helpers) => {
  config.plugins.push(
    new WorkboxPlugin.InjectManifest({
      swSrc: './service-worker.js',
      swDest: './service-worker.js',
      include: [/\.html$/, /\.js$/, /\.svg$/, /\.css$/, /\.png$/, /\.ico$/]
    })
  )

  // Going to mock Peer.js for SSR
  if (env.ssr) {
    config.resolve.alias.peerjs = `${__dirname}/src/lib/peerjs-mock.js`
  }

  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: 'robots.txt' }]))
  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: 'browserconfig.xml' }]))

  return config
}
