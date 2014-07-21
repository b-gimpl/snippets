var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css')

var del = require('del');

var paths = {
    css: 'static/css/min/**/*',
    images: 'static/img/min/**/*',
    scripts: 'static/js/min/**/*.js'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(paths.scripts)
        .pipe(uglify({
            preserveComments: 'none'
        }))
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('static/js'));
});


gulp.task('css', function() {
    gulp.src(paths.css)
        .pipe(minifyCSS({
            keepBreaks: false
        }))
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('static/css'));
});


// Copy all static images
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('static/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.css, ['css']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images', 'css']);