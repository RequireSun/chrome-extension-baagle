// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // 其它选项...
    module: {
        rules: [
            // ... 忽略其它规则
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // ... 忽略 vue-loader 插件
        new MiniCssExtractPlugin({
            filename: 'index.modifier.css'
        })
    ]
};
