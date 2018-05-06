var gulp = require('gulp');//引入gulp，管理插件由gulp开启任务
//引入路径模块
var path = require("path");
var uglify = require('gulp-uglify');//js压缩插件
var rename = require('gulp-rename');//重命名插件
var clean = require('gulp-clean-css');//css压缩
var less = require('gulp-less');//less编译
var livereload = require('gulp-livereload')//热刷新插件
//引入资源地图模块
var sourceMaps = require('gulp-sourcemaps');
// 引入Less插件模块 
var sass =require('gulp-sass');
// var webserver = require('gulp-webserver');//浏览器自动打开能开启热刷新
/* 
    gulp开启任务 gulp.task('参数 任务名称',callback)
    gulp可以链式操作
*/
gulp.task('less',function(){
    gulp
        .src('./public/src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./public/src/css'))
        .pipe(livereload())
});
gulp.task('sass',function(){
    gulp
        .src('./public/src/sass/*.sass')
        .pipe(less())
        .pipe(gulp.dest('./public/src/css'))
        .pipe(livereload())
});
gulp.task('uglify', function () {
    gulp
        .src('./public/src/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest('./public/dist/js'))
        .pipe(livereload())
});
gulp.task('clean',function(){
    gulp
        .src('./public/src/css/*.css')
        .pipe(clean())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest('./public/dist/css'))
        .pipe(livereload())
})

//热刷新插件可以开启服务器
/* gulp.task('webserver',function(){
    gulp
        .src('./') // 服务器目录（./代表根目录）
        .pipe(webserver({ // 运行gulp-webserver
        livereload: true, // 启用LiveReload
        open: true // 服务器启动时自动打开网页
    }));

}) */
gulp.task('default',function(){
    livereload.listen()
    gulp.watch('./public/src/**/*',['less','sass'])
    gulp.watch('./public/src/css/*.css',['clean'])
    gulp.watch('./public/src/js/*.js', ['uglify'])
})
/* 
任务依赖，当前任务开启后，先运行依赖任务
gulp.task('default',['webserver','watch']) 
*/