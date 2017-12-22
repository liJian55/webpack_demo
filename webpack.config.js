const path = require('path');
const entry = require('./webpack_config/enrty_webpack')
const extractTextPlugin = require('extract-text-webpack-plugin');//压缩css
const PrifyCssPlugin = require('purifycss-webpack');
const uglify = require('uglifyjs-webpack-plugin');//压缩js
const htmlPlugin = require('html-webpack-plugin');//插件-- 加哈希 清除attribute
const glob = require('glob');
const webpack = require('webpack');



console.log(encodeURIComponent(process.env.type))
if(process.env.type=="build"){
    var website = {
        publicpath:"http://jspang.com:1717/"
    }
   
}else{
    var website = {
        publicpath:"http://192.168.2.172:8081/"
    }
}
module.exports={
    //devtool:'source-map',
    entry:{
        entry:'./src/entry.js',
        jquery:'jquery',
        vue:'vue'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:website.publicpath
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {loader:"css-loader",options:{improtLoaders:1}},
                        'postcss-loader'
                    ]
                })
            },{
                test:/\.(png|jpg|jpeg|gif)/,
                use:[{
                    loader:'file-loader',
                    options:{
                        limit:500,
                        outputPath:"images/"
                    }
                }]
            },{
                test:/\.(html|htm)$/i,
                use:['html-withimg-loader']
            },{
                test:/\.less$/,
                use:extractTextPlugin.extract({
                    use:[{
                        loader:'css-loader'
                    },{
                        loader:'less-loader'
                    }],
                    fallback:'style-loader'
                })
            },{
                test:/\.scss/,
                use:extractTextPlugin.extract({
                    use:[
                        {loader:'css-loader'},
                        {loader:'sass-loader'},
                    ],
                    fallback:'style-loader'
                    
                })
            },{
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader'
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:['jquery','vue'],
            filename:'assets/js/[name].js',
            minChunks:2
        }),


        //new uglify()
        new webpack.ProvidePlugin({
            $:"jquery",
        }),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin("css/index.css"),
        new PrifyCssPlugin({
            paths:glob.sync(path.join(__dirname,'src/*.html')) 
        }),
        new webpack.BannerPlugin('李坚版权所有')
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'192.168.2.172',
        compress:true,
        port:8081
    },
    // watchOptions:{
    //     poll:1000,//检测修改的时间
    //     //aggregeateTimeout:500,//防止重复按键 500ms内 webpack3.10貌似已移除
    //     //ignored:/node_modules/, //不检测

    // }
    
}