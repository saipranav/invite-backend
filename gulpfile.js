var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
		camelize: false,
		replaceString: /^gulp(-|\.)/,
		pattern: ['gulp-*', 'gulp.*', 'jshint-stylish'],
		renameFn: function(name) {
			name = name.replace(/^gulp(-|\.)/,'');
			return name.replace('-', '_');
		}
	});
var config = require('./tools/config');

function get_task(task_name) {
	return require('./tools/gulp-tasks/'+task_name)(gulp, config, plugins);
}

gulp.task('lint', get_task('lint'));

gulp.task('watch.development', get_task('watch.development'));

gulp.task('watch.test', get_task('watch.test'));

gulp.task('serve.development', get_task('serve.development'));

gulp.task('serve.test', get_task('serve.test'));

gulp.task('unit-tests', get_task('unit-tests'));

gulp.task('pre.test', get_task('pre.test'));

gulp.task('development', plugins.sequence(['lint', 'watch.development'], 'serve.development'));

gulp.task('unit-test', plugins.sequence(['lint', 'watch.test', 'pre.test'], 'serve.test', 'unit-tests'));