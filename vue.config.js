/**
 * Created by kelvinsun on 18/9/29.
 *
 * vue-cli config file.
 */

'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // 因为这个项目是打包发布的 app, 不是线上资源, 所以不需要哈希
    filenameHashing: false,
    // outputDir: 'dist/js',
    // 这个参数会把所有的编译文件塞到 image 里
    // assetsDir: 'image',
    pages: {
        popup: {
            entry: 'src/popup.ts',
            template: 'public/popup.html',
        },
        background: {
            entry: 'src/background.ts',
            template: 'public/background.html',
        },
    },
    // 开发的时候为 true, 发布时为 false
    productionSourceMap: 'development' === process.env.NODE_ENV,
    configureWebpack: {
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?importLoaders=1',
                    // 'postcss-loader',
                    // 'less-loader',
                ],
            }],
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'public/manifest.json', to: 'manifest.json', },
                { from: 'src/image/*.png', to: 'image/[name].png', },
            ]),
            // new MiniCssExtractPlugin({
            //     filename: '[name].css',
            //     chunkFilename: '[id].css',
            // }),
        ],
    },
    // css相关配置
    // css: {
    //     // 是否使用css分离插件 ExtractTextPlugin
    //     extract: true,
    //     // 开启 CSS source maps?
    //     sourceMap: false,
    //     // css预设器配置项
    //     loaderOptions: {},
    //     // 启用 CSS modules for all css / pre-processor files.
    //     modules: false
    // },
    // chainWebpack 修改编译目标目录
    // https://segmentfault.com/q/1010000016475212
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(args => {
                // 日, 这里不应该放数组
                return {
                    limit: 4096,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: 'image/[name].[ext]',
                        },
                    },
                };
            });
    },
};
