import webpack,  { DefinePlugin } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import colors from 'colors';
import webpackConfig from '../webpack.config';

// add production-specific plugins
webpackConfig.plugins.unshift(

	// add plugin to clean the output folder
	new CleanWebpackPlugin([
		webpackConfig.output.path,
	], {
		root: webpackConfig.context,
		verbose: false,
	}),

	// add the environment define plugin
	new DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
    }),

	// add plugin to extract
	new ExtractTextWebpackPlugin({
		filename: 'bundle.css',
	}),
);

// extract css
// const sassRule = webpackConfig.module.rules.find(rule => rule.test.toString() === '/\\.scss$/');
// sassRule.use = ExtractTextWebpackPlugin.extract(sassRule.use);

// overwrite the use parameter for css rule to extract css
webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
	// only modify the sass (scss) rule
	if (rule.test.toString().indexOf('.scss') === -1) {
		return rule;
	}

	// add the extracter
	rule.use = ExtractTextWebpackPlugin.extract({
		fallback: 'style-loader',
		use: rule.use.filter(rule => rule.loader !== 'style-loader').map(rule => rule.loader)
	});

	return rule;
});

// create compiler
const compiler = webpack(webpackConfig);
const startTime = Date.now();

// run the compiler generating production build
compiler.run((error, stats) => {
	if (error) {
		console.log('FAILED'.red);
		console.error(error);

		return;
	}

	const timeTaken = Date.now() - startTime;

	console.log('SUCCESS'.green + ` in ${timeTaken}ms`);
})
