import HtmlWebpackPlugin from 'html-webpack-plugin';
import { HotModuleReplacementPlugin } from 'webpack';

export default {

    // base directory
    context: __dirname,

    // application entry filename
    entry: {
        app: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:3000',
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
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },

            // add support loading media files
            {
    			test: /\.(gif|png|jpe?g|svg)$/,
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
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            }
        ]
    },

    // configure plugins
    plugins: [
        // generate the HTML file from our template
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),

        // enable hot-reloading
        new HotModuleReplacementPlugin()
    ],

    // generate source-maps
    devtool: 'source-map',
};
