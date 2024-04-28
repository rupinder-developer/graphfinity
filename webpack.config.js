module.exports = {
    mode: 'production',
    entry: ['./src/index.js'],
    output: {
        filename: 'graphfinity.js',
        library: "graphfinity",
        libraryTarget: "var"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}