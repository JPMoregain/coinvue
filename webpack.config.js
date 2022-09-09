const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
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
            }
        ]
    }
}