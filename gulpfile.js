var gulp =            require('gulp'),
    uglify =          require('gulp-uglify'),
    autoprefixer =    require('gulp-autoprefixer'),
    cleanCSS =        require('gulp-clean-css'),
    imagemin =        require('gulp-imagemin'),
    nunjucksRender =  require('gulp-nunjucks-render'),
    concat =          require('gulp-concat'),
    htmlmin =         require('gulp-htmlmin');

// Static Server + watching scss/html files.
// gulp.task('serve', ['sass', 'nunjucks-html-watch'], function() {
//     // browserSync.init({
//     //     server: './build'
//     // });

//     gulp.watch('css/dev/*.scss', ['sass']);
//     gulp.watch('./**/*.html', ['nunjucks-html-watch'])
// });

// gulp.task('compressJs', function () {
//     return gulp.src('js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('build/js'))
// });

gulp.task('compressImage', function () {
    return gulp.src('img/**')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('build/img'))
});

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['v2/**/*.html']);
  return gulp.src(['v2/partials/*.html', '!v2/library/*.*', '!v2/vendors/*.*', '!v2/scss/*.*', '!v2/documentation/*.*'])
    .pipe(nunjucksRender({
      path: ['.']
    }))
    .pipe(htmlmin(
      {
        collapseWhitespace: false,
        removeComments: false
      }))
    .pipe(gulp.dest('v2/build'))
});

// Create a task that ensures the `nunjucks` task is complete before reloading browsers.
// gulp.task('nunjucks-html-watch', ['nunjucks'], function () {
//   browserSync.reload();
// });

// gulp.task('vendors-scripts', function() {
//   return gulp.src([
//       './node_modules/jquery/dist/jquery.min.js'])
//     .pipe(concat('vendors.js'))
//     .pipe(gulp.dest('build/js/'));
// });

gulp.task('copy-files', function() {
  return gulp.src([
    'v2/css/**/*',
    'v2/fonts/**/*',
    'v2/img/**/*',
    'v2/js/**/*',
    'v2/vendors/**/*'
  ], { 'base':'./v2/' } )
  .pipe(gulp.dest('v2/build'))
});

// Compile project.
// gulp.task('build-project',
//   ['compressImage', 'compressJs', 'nunjucks', 'vendors-scripts', 'copy-files']);

// Compile and start project.
// gulp.task('default', ['build-project', 'serve']);