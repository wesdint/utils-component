var gulp = require('gulp')
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

const postcssConfig = [autoprefixer({ browsers: [
  'last 100 versions'
] })]

gulp.task('demo', function(){
  gulp.src(['demo/*.css'])
    .pipe(postcss(postcssConfig))
    .pipe(gulp.dest('demo'))
});

gulp.task('dist', function(){
  gulp.src(['dist/*.css'])
    .pipe(postcss(postcssConfig))
    .pipe(gulp.dest('dist'))
});