import gulp from 'gulp';
import sass from 'gulp-sass';
import sassCompiler from 'sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const scss = sass(sassCompiler);

// Paths to SCSS and CSS
const paths = {
  scss: './src/scss/**/*.scss',
  css: './src/css',
  html: './src/**/*.html',
  js: './src/**/*.js'
};

// Task to compile SCSS
function compileSCSS() {
  return gulp
    .src(paths.scss)
    .pipe(scss().on('error', scss.logError))
    .pipe(gulp.dest(paths.css));
}

// Task to process CSS (autoprefixing and minification)
function processCSS() {
  return gulp
    .src(`${paths.css}/**/*.css`)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.css));
}

// Watch for changes
function watch() {
  gulp.watch(paths.scss, gulp.series(compileSCSS, processCSS));
  gulp.watch(paths.html).on('change', gulp.series(compileSCSS, processCSS));
  gulp.watch(paths.js).on('change', gulp.series(compileSCSS, processCSS));
}

// Default task to run Gulp
export default gulp.series(compileSCSS, processCSS, watch);
