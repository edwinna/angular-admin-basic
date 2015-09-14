// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 检查脚本,会检查js/目录下得js文件有没有报错或警告。
gulp.task('lint', function() {
    gulp.src('/js/*/.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//压缩css
gulp.task('minifycss', function() {
    return gulp.src('css/*.css')      //压缩的文件
         .pipe(concat('main.css')) 
        .pipe(gulp.dest('dist/css')) 
        .pipe(minifycss());   //执行压缩

});


gulp.task('minifyangular', function() {
    return gulp.src('vendor/angular/*/*.js')
        .pipe(concat('angular-plugins.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dist/angular'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/angular'));  //输出
});

gulp.task('minifyjquery', function() {
    return gulp.src('vendor/jquery/*/*.js')
        .pipe(concat('plugins.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dist/jquery'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/jquery'));  //输出
});

gulp.task('minifyjs', function() {
    return gulp.src('js/*/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('dist/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'));  //输出
});
 
// 默认任务 
gulp.task('default', function(){
    gulp.run('lint', 'minifycss', 'minifyjs');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'minifycss', 'minifyjs');
    });

});