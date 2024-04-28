module.exports = {
    mode: 'production',
    entry: ['./src/index.js'],
    output: {
        filename: 'graphfinity.module.js',
        libraryTarget: 'module'
    },
    experiments: {
        outputModule: true,
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
