var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin();

module.exports = function (env) {
    return {
        entry: {
            index: "./src/app.tsx"
        },

        mode: 'development',

        output: {
            path: path.join(__dirname, 'public'),
            filename: '[hash].js',
            chunkFilename: '[chunkhash].js',
        },

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },

        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                logInfoToStdOut: true,
                                logLevel: 'info'
                            }
                        }
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader"
                        }]

                    })
                },
                {
                    test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: './content/'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("[name].css"),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/tpl/index.html'
            }),
            assetsPluginInstance
        ],
        devServer: {
            contentBase: path.join(__dirname, 'tmp'),
            host: 'localhost',
            port: 5000,
            historyApiFallback: true,
            open: 'http://localhost:5000'
        }
    }
}