var webpack = require('webpack');
const path = require('path');
const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(process.env.NODE_ENV);
console.log(NODE_ENV);

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
    devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : false,
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify(NODE_ENV),
              BASE_URL: NODE_ENV == 'development' ? JSON.stringify('/') : JSON.stringify('/ReactRedux-Notes-Mongo'),
              API_SERVER: NODE_ENV == 'development' ? null : JSON.stringify('https://dry-shelf-54305.herokuapp.com')
            },
        }),
        new webpack.NoEmitOnErrorsPlugin()
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
                warnings:       false,
                drop_console:   true,
                unsafe:         true
            }
        }),
        new GhPagesWebpackPlugin({
            path: './public',
            options: {
                message: 'Update ReactApp Notes MongoDB',
                user: {
                    name: 'EugeneKey',
                    email: 'evgeny.konyaev@gmail.com'
                }
            }
        })
    );
}