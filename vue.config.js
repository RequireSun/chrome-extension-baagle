/**
 * Created by kelvinsun on 18/9/29.
 *
 * vue-cli config file.
 */

'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// CSS入口配置
var CSS_PATH = {
    css: {
        pattern: ['./src/**/[^_]*.less', '!./src/old/**/*.less'],
        src: path.join(__dirname, 'src'),
        dst: path.resolve(__dirname, 'static/build/webpack'),
    }
}

// 遍历除所有需要打包的CSS文件路径
function getCSSEntries(config) {
    var fileList = glob.sync(config.pattern)
    return fileList.reduce(function (previous, current) {
        var filePath = path.parse(path.relative(config.src, current))
        var withoutSuffix = path.join(filePath.dir, filePath.name)
        previous[withoutSuffix] = path.resolve(__dirname, current)
        return previous
    }, {})
}
// https://www.jianshu.com/p/439764e3eff2

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
        plugins: [
            new CopyWebpackPlugin([
                { from: 'public/manifest.json', to: 'manifest.json', },
                { from: 'src/image/*.png', to: 'image/[name].png', },
            ]),
        ],
    },
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
