var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	ngAnnotate = require('gulp-ng-annotate');

gulp.task('uglify', function() {
	return gulp.src('js/script.js')
		.pipe(ngAnnotate())
		.pipe(gulp.dest('dist'))
		.pipe(rename('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
	gulp.watch('*.js', ['ngAnnotate', 'rename', 'uglify']);
});

gulp.task('default', ['uglify', 'watch']);