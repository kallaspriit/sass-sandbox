import webpack,  { DefinePlugin } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';

// add production-specific plugins
config.plugins.unshift(
	// add the environment define plugin
	new DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
    })
);

const compiler = webpack(config);

compiler.run((error, stats) => {
	if (error) {
		console.error(error);

		return;
	}

	console.log('success');
})
