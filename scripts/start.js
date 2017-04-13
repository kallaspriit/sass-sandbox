import webpack, { HotModuleReplacementPlugin, DefinePlugin } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import colors from 'colors';
import webpackConfig from '../webpack.config';

// dev server configuration
const serverConfig = {
    hot: true,
	overlay: {
		warnings: true,
		errors: true,
	},
	stats: {
		colors: true,
	},
	quiet: true,
	noInfo: true,
	host: '0.0.0.0',
	port: 3000
};

// add development-specific plugins
webpackConfig.plugins.unshift(
	// add the environment define plugin
	new DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('development')
    }),

	// add hot module replacement plugin
	new HotModuleReplacementPlugin()
);

// add hot reload entries
webpackConfig.entry.app.unshift(
	'webpack-dev-server/client?http://localhost:3000',
	'webpack/hot/dev-server'
);

// setup compiler and dev server
const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, serverConfig);

// configure compiler
let compileStartTime = Date.now();

// called when the compiler starts compiling
compiler.plugin('compile', (params) => {
	compileStartTime = Date.now();

	// process.stdout.write('compiling.. ');
});

// called when compiler finishes update
compiler.plugin('done', (stats) => {
	const compileTimeTaken = Date.now() - compileStartTime;
	const info = stats.toJson()

	if (stats.hasErrors()) {
		console.log('GOT ERRORS'.red + ` in ${compileTimeTaken}ms`);

		info.errors.forEach(message => {
			const lines = message.split(/\n/);

			console.error(lines[0].red);
			console.error(lines.splice(1).map(line => '> ' + line).join('\n'));
			console.log('');
		});
	} else if (stats.hasWarnings()) {
		console.log('GOT WARNINGS'.yellow + ` in ${compileTimeTaken}ms`);

		info.warnings.forEach(message => {
			const lines = message.split(/\n/);

			console.error(lines[0].yellow);
			console.error(lines.splice(1).map(line => '> ' + line).join('\n'));
			console.log('');
		});
	} else {
		console.log('UPDATED'.green + ` in ${compileTimeTaken}ms`);
	}
});

// called when compiling fails hard
compiler.plugin('failed', (error) => {
	console.error('FAILED'.red + ` (${error})`);
});

// start the dev server on given port
devServer.listen(serverConfig.port, serverConfig.host, () => {
	console.log('');
	console.log('-- Starting development server --'.underline);
});
