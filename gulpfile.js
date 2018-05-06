//引入gulp模块
var gulp = require('gulp');

//引入路径模块
var path = require("path");

//引入Less插件模块
var less = require('gulp-less');

//引入Less插件模块
var sass =require('gulp-sass');

//引入资源地图模块
var sourceMaps = require('gulp-sourcemaps');

//引入热刷新模块
var liveReload = require('gulp-livereload');

//引入压缩重命名插件模块
var rename = require('gulp-rename');

//引入压缩模块
var cleanCss = require('gulp-clean-css');

//引入删除模块
var del = require("del");

//------------------------开发阶段-------------------------------------------

//配置less任务
gulp.task("lessTask", function () {
    // * 匹配任意数量的字符
    gulp.src("./public/src/less/*.less") //设置源文件的路径
        .pipe(sourceMaps.init()) //初始化资源地图
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        })) //调用插件的方法去编译less文件
        .pipe(sourceMaps.write("./maps")) //写入资源地图
        .pipe(gulp.dest("./public/dist/css/")) //设置输出文件夹
        .pipe(liveReload()) //调用热刷新方法
});

//配置sass任务
gulp.task("sassTask",function(){
    // * 匹配任意数量的字符
    gulp.src("./public/src/sass/*.scss") //设置源文件的路径
        .pipe(sourceMaps.init()) //初始化资源地图
        .pipe(sass().on('error', sass.logError)) //调用插件的方法去编译sass文件
        .pipe(sourceMaps.write("./maps")) //写入资源地图
        .pipe(gulp.dest("./public/dist/css/")) //设置输出文件夹
        .pipe(liveReload()) //调用热刷新方法
});

//定义less+sass观察者任务
gulp.task("watch", function () {
    liveReload.listen(); //开启监听
    gulp.watch("./public/src/**/*", ["lessTask","sassTask"]); //观察者，less+sass变化就执行编译,"sassTask"
});

//------------------------发布阶段-------------------------------------------

//定义压缩css任务
gulp.task("cssClean", function () {
    // * 匹配任意数量的字符
    gulp.src("./dist/css/*.css") //设置源文件的路径
        .pipe(cleanCss()) //调用插件的方法去压缩CSS文件
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist/css/")) //设置输出文件夹
});

//配置一个删除垃圾文件的任务
gulp.task("delTempTask", function () {
    del("./temp").then(function () {
        console.log("垃圾文件清除成功！！！！");
    });
});

//串行任务： 网站发布时调用，在网站要上线的时候执行 gulp publishTask
gulp.task("publishTask", function () {
    sequence("cssClean", "delTempTask");
});