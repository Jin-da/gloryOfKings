module.exports = {
  outputDir: __dirname + '/../server/web',
  publicPath: process.env.Node_ENV === 'production'
  ? '/'
  : '/'
}