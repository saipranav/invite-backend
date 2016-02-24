module.exports = function(gulp, config, plugins){
	return function(){
		gulp.src(['server/**/*.js', 'tools/**/*.js'])
			.pipe(plugins.plumber())
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter(plugins.jshint_stylish));
	};
};