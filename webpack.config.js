const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');

module.exports = {
    entry : './src/app/main.js',
    output : {
        path: path.join(__dirname, '/src/public/js'),
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                      }
                }
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            { 
                test: /\.txt$/,
                exclude: /node_modules/, 
                use: 'raw-loader' 
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
};