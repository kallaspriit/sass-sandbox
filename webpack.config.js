import HtmlWebpackPlugin from 'html-webpack-plugin';
import { NamedModulesPlugin } from 'webpack';
import glob from 'glob';
import path from 'path';

const resolvePath = relativePath => path.resolve(__dirname, relativePath);
const includePaths = [
    resolvePath('.', 'gfx')
];

const config = {

    // base directory
    context: __dirname,

    // application entry filename
    entry: {
        app: [
            './index'
        ]
    },

    // output configuration
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },

    // configure module loaders
    module: {
        rules: [

            // add support for loading html files
            {
                include: includePaths,
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }],
            },

            // add support loading media files
            {
    			test: /\.(gif|png|jpe?g|svg)$/,
                include: includePaths,
    			loaders: [
    				{
    					loader: 'file-loader',
    					query: {
                        	hash: 'sha512',
                        	digest: 'hex',
                        	name: process.env.NODE_ENV === 'production' ? 'static/gfx/[name].[hash:8].[ext]' : '[path][name].[ext]',
                        },
    				},
    				{
    					loader: 'image-webpack-loader',
    					query: {
    						progressive: true,
    						optipng: {
    							optimizationLevel: 4,
    						},
    						gifsicle: {
    							interlaced: false,
    						},
    						pngquant: {
    							quality: '65-90',
    							speed: 4,
    						},
    					},
    				},
    			],
    		},

            // add support for loading sass files
            {
                test: /\.scss$/,
                include: includePaths,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }
        ]
    },

    // configure plugins
    plugins: [
        new NamedModulesPlugin(),
    ],

    // generate source-maps
    // devtool: 'source-map',
};

// addd a html webpack plugin for each of the html files
glob.sync('*.html').forEach((filename) => {
    config.plugins.push(new HtmlWebpackPlugin({
        filename,
        template: filename
    }));
});

export default config;
