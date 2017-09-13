var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var image = require('gulp-image');
var autoprefixer = require('gulp-autoprefixer');
var responsive = require('gulp-responsive');


// Static Server + watching scss/html files through BrowserSync
gulp.task('serve', function() {

    //specify which folder should be synced to the browser
    browserSync.init({
        server: "./build",
        browser: ["google chrome"]
    });

    //watch for changes in scss and html folders, and compile if changed
    gulp.watch("./src/scss/**/*.scss", ['sass']);
    gulp.watch("./src/html/*.html", ['copy-html']);
    gulp.watch("./src/js/**/*.js", ['copy-js']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
        gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

// Copy html to build file
gulp.task('copy-html', function() {
    gulp.src('./src/html/*.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

// Copy js to build file
gulp.task('copy-js', function() {
    gulp.src('./src/js/**/*.js')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
});

// gulp
// Running gulp default will allow any changes to the src files to compile to the build folder and refresh the browser. Click Control + C in terminal to close
gulp.task('default', ['serve']);

// gulp image
// Optimize imagery
gulp.task('image', function () {
  gulp.src('./src/img/*')
    .pipe(image({
      pngquant: true,
      optipng: true,
      zopflipng: true,
      jpegRecompress: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('./build/img'));
});

//gulp responsive
// Take images from illustration-thumb and resize them to be optimal for all screens (thumb display)
gulp.task('responsive', function () {
  return gulp.src('src/img/illustration-thumb/*.{png,jpg}')
    .pipe(responsive({
      '*.jpg': {
        width: 640,
        quality: 50
      }
    }))
    .pipe(gulp.dest('./build/img/illustration-thumb'));
});
