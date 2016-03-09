'use strict';
 
var gulp 			= require('gulp'),
	sass 			= require('gulp-ruby-sass'),
	rename 			= require('gulp-rename'),
	concat 			= require('gulp-concat'),
	uglify 			= require('gulp-uglify'),
	gutil 			= require('gulp-util');
 
gulp.task('sass', function () {
	//make this a separate, agnostic task
	// gulp.src('src/sass/jquery-ui/smoothness/images/**/*')
 //    	.pipe(gulp.dest('build/css/images/'));
    	
	return sass('src/sass/**/*.scss', { style: 'expanded', compass: true, verbose: true })
        .pipe(gulp.dest('./build/css'));
});

/* can't be used until we go modular, let's make functional progress first */
gulp.task('js-dev', function(){
	return gulp.src(['./src/js/**/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js'));
});

/* this will be used to compile js for prod */
gulp.task('js-prod', function(){
	return gulp.src(['./src/js/**/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js'));
});
 
gulp.task('default', function () {
  gulp.watch(['src/sass/**/*.scss','src/sass/**/*.css'], ['sass']);

  // gulp.watch('src/js/**/*.js', ['js-dev']);
});

