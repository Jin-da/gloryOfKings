module.exports = {
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.Node_ENV === 'production'
  ? '/admin/'
  : '/'
}