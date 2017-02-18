var webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: "./client/main.js",
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : null,
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        contentBase: path.join(__dirname, "public"),
        inline: true,
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true,
            chunks: false,
            'normal': true
        }
    },                                
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: NODE_ENV == 'development' })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['react-hot-loader', 'babel-loader'],
                include: [/client/],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'autoprefixer-loader'],
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: 'img/[path][name].[ext]'
                    }
                }
            }
        ]
    }
};

if (NODE_ENV == 'production') {
    console.log('WTF');
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
       }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                sourceMap: false,
                warnings:       false,
                drop_console:   true,
                unsafe:         true
            }
        })
    );
}