import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config';

// add hot reload
// webpackConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');

const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, {
	/*compress: true,
	clientLogLevel: 'none',
	contentBase: 'public',
	hot: true,
	publicPath: 'build',
	quiet: true,
	watchOptions: {
		ignored: /node_modules/,
	},
	host: '0.0.0.0',*/
    hot: true
});

devServer.listen(3000);
