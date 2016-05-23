var webpack = require('webpack'),
    //CompressionPlugin = require("compression-webpack-plugin"),
    NODE_ENV = process.env.NODE_ENV || 'production';

   console.log('NODE_ENV=', NODE_ENV);

function getEntrySources(sources) {
    if (NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://127.0.0.1:8080');
        sources.push('webpack/hot/only-dev-server');
    }
    return sources;
}

function plugins(plugins) {
    if (NODE_ENV == 'production') {
        console.log('uglify');
        plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
        /*
        plugins.push(new CompressionPlugin({
            asset: "{file}.gz",
            algorithm: "gzip",
            regExp: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }));
        */
    }   else {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return plugins
}

function loaders() {
    var result = [
        {test: /\.png$/,  loader: "url?limit=10000&mimetype=image/png" },
        {test: /\.jpg/,  loader: "url?limit=10000&mimetype=image/jpeg" },
        {test: /\.woff$/, loader: 'url'},
        {test: /\.less$/, loader: "style!css!less?strictMath&noIeCompat", hot: true}
    ];
    if (NODE_ENV == 'production') {
        result.push({
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/,
            query: {
                presets: [ 'react', 'es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3'],
                plugins: [
                    'transform-es2015-modules-commonjs', //все для старых ie
                    'transform-runtime',
                    'transform-es3-member-expression-literals',
                    'transform-es3-property-literals'
                ]
            }
        });
    }   else {
        result.push({
            test: /\.js$/,
            loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react'],
            exclude: /(node_modules|bower_components)/
        });
    }

    return result;
}

module.exports = {
    //context: __dirname + "/app",
    entry: {
        helloWorld: getEntrySources([
            "es5-shim", //все для старых ie
            "es5-shim/es5-sham",
            "./index.js"
        ])
    },
    devtool: NODE_ENV == "development" ? "inline-source-map" : null, // source-map для дебага, для продакшена отключаем
    output: {
        path: __dirname,
        filename: "./web/main.js"
    },
    module: {
        loaders: loaders()
    },
    plugins: plugins([
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': NODE_ENV // глобальная переменная
        })
    ])
};