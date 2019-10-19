const path=require('path')
const {src,dest,series,parallel,watch}=require('gulp')
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const  webpack=require('webpack-stream')
sass.compiler = require('node-sass');
const proxy=require('http-proxy-middleware')

// copyhtml
function copyhtml(){
    return src('./src/*.html')
    .pipe(dest('./dev/')) 
    .pipe(connect.reload())   
}
function copylibs(){
    return src('./src/libs/**/*')
    .pipe(dest('./dev/libs'))
}
// 编译sass
function packScss(){
    return src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dev/styles/'))
    .pipe(connect.reload())

}
function copyassets() {
    return src('./src/assets/**/*')
      .pipe(dest('./dev/assets'))
  }
// js模块化
function packJS(){
    return src('./src/scripts/*.js')
    .pipe(webpack({
        mode:'development',
        entry:{
            app:'./src/scripts/app.js',
            categroy:'./src/scripts/categroy.js',
            usercenter:'./src/scripts/usercenter.js',
            mycart:'./src/scripts/mycart.js',
            detail:'./src/scripts/detail.js',
            list:'./src/scripts/list.js',
            

          },
        output:{
            path:path.resolve(__dirname,"./dev"),
            filename:"[name].js"
        },
        module:{
            rules:[
                {
                    test:/\.html$/,
                    loader:"string-loader"
                },
                {
                    test:/\.art$/,
                    loader:"art-template-loader"
                }
            ]
        }

    }))
    .pipe(dest('./dev/scripts'))
    .pipe(connect.reload())

}
function gulpServer(){
    return connect.server({
        name:"Dist App",
        // host:"10.9.49.254",
        root:"dev",
        port:8000,
        livereload:true,
        middleware: () => {
            return [
              proxy('/api', {
                target: 'https://apiv2.pinduoduo.com/',
                changeOrigin: true,
               /*  pathRewrite: {
                  '^/api': ''
                } */
              })
            ]
          }  
    })
}
function watcher (){
    watch(['./src/*.html'],series(copyhtml));
    watch(['./src/**/*.scss'],series(packScss))
    watch(['./src/**/*'],series(packJS))
    watch('./src/libs/*', series(copylibs))
    

}

exports.default=series(parallel(copyhtml,copyassets,packScss,packJS,copylibs),parallel(watcher,gulpServer))

