import webpack,  { DefinePlugin } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import colors from 'colors';
import webpackConfig from '../webpack.config';

// add production-specific plugins
webpackConfig.plugins.unshift(

	// add plugin to clean the output folder
	new CleanWebpackPlugin([
		webpackConfig.output.path,
	], {
		root: webpackConfig.context,
		verbose: true
	}),

	// add the environment define plugin
	new DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
    })
);

const compiler = webpack(webpackConfig);

compiler.run((error, stats) => {
	if (error) {
		console.log('failed'.red);
		console.error(error);

		return;
	}

	console.log('success'.green);
})
