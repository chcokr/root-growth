module.exports.cwbBrowsers = 'last 2 versions';

module.exports.webpackConfigs = {
  cwbStart: {
    entry: './src/index.jsx',
    target: 'web',
    module: {
      loaders: [
        ...(process.argv[2] !== 'wds' ? [] : {
          test: /\.(js|jsx)$/,
          loader: 'react-hot',
          exclude: [
            /node_modules/,

            // The following two exceptions will disappear once CWB is published
            // on npm.
            // Currently, `npm link` is being used to symlink local copies of
            // chcokr-js-build and chcokr-webapp-build into this repository's
            // node_modules/.
            // Because they are symlinked, their actual resolved paths don't
            // include the word node_modules, and therefore react-hot-loader
            // ends up being applied to files within chcokr-js-build and
            // chcokr-webapp-build.
            // This causes some really funky errors.
            // So the following two exceptions are necessary as long as
            // chcokr-js-build and chcokr-webapp-build are being symlinked into
            // this repository.
            /js-build/,
            /webapp-build/
          ]
        })
      ]
    }
  }
};
