const {resolve} = require('path');
//html模版
const HtmlWebpackPlugin = require('html-webpack-plugin');
// vue-loader
const {VueLoaderPlugin} = require("vue-loader");
// 复制静态资源文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 提取css到单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    entry: {
        'main':'./src/main.js',
        'background':'./src/main/background.js'
    },
    output: {
        path:resolve(__dirname, './build'),
        filename:'js/[name].js',
        clean:true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'less-loader'
                ]
            },
            {
                test: /\.js$/,
                include: [ resolve(__dirname, './src') ],
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
                type: "asset",
                generator:{
                    filename:'assets/img/[name].[hash:10].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: "asset",
                generator:{
                    filename:'assets/media/[name].[hash:10].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: "asset",
                generator:{
                    filename:'assets/font/[name].[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:resolve(__dirname,'./public/popup.html'),
            title: 'chrome-extension',
            filename:'html/popup.html',
            minify:false,
            chunks:['main']
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash].css",
            chunkFilename: "[contenthash].css"
        }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: resolve(__dirname,'./src/main/manifest.json'),
                    to: resolve(__dirname,'./build/manifest.json')
                },
                {
                    from: resolve(__dirname, './src/assets/img/icon/'),
                    to: resolve(__dirname,'./build/assets/img/icon')
                }
            ]
        }),
    ]
}