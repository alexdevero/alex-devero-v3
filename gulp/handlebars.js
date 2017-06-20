'use strict';

import gulp from 'gulp';

import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import handlebars from 'gulp-hb';
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';

// Compile handlebars to HTML
gulp.task('handlebars:development', () => {
  return gulp.src('./src/templates/*.hbs')
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(handlebars({
      data: './src/templates/data/**/*.json',
      helpers: './src/templates/helpers/**/*.js',
      partials: './src/templates/partials/**/*.hbs'
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream({
      match: '**/*.html'
    }));
});

// Compile handlebars to HTML, minify HTML
gulp.task('handlebars:production', () => {
  return gulp.src('./src/templates/*.hbs')
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(handlebars({
      data: './src/templates/data/**/*.json',
      helpers: './src/templates/helpers/**/*.js',
      partials: './src/templates/partials/**/*.hbs'
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream({
      match: '**/*.html'
    }));
});
