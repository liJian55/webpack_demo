const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
var website = {
    publicpath:"http://192.168.2.172:8081/"
}
module.exports={
    entry:{
        entry:'./src/entry.js'
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
                    use:"css-loader"
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
            }
        ]
    },
    plugins:[
        //new uglify()
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin("css/index.css")
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'192.168.2.172',
        compress:true,
        port:8081
    }
    
}