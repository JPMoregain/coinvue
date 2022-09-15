const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    devServer: {
        proxy: {
          '*': {
            target: 'http://localhost:3000',
            secure: false,
          },
        },
      },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            // each object is a rule
            { 
                // use babel to transpile all files that end in .js
                test: /.js$/, //regex expression
                // make sure babel does NOT transpile files located in node modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // specify options for babel loader as an object
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf)$/,
                loader: 'url-loader',
              }
        ]
    },
}