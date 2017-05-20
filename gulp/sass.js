'use strict';

import gulp from 'gulp';

const browserSync = require('browser-sync');
const csscomb = require('gulp-csscomb');
const csslint = require('gulp-csslint');
const cssnano = require('cssnano');
const cssnext = require('postcss-cssnext');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// Sass to CSS
gulp.task('sass', () => {
  const processors = [
    cssnext({
      browsers: ['last 5 versions', 'ie >= 8']
    }),
    cssnano({
      autoprefixer: false
    })
  ];

  return gulp.src('src/scss/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', (e) => {
      console.log(e + '\r\n There\'s something wrong with the Sass file(s).')
    }))
    .pipe(csscomb())
    .pipe(postcss(processors))
    .pipe(csslint())
    .pipe(csslint.formatter())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }));
});

gulp.task('sass:test', () => {
  const sassLint = require('gulp-sass-lint');

  console.log('Running Sass lint test');

  return gulp.src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
