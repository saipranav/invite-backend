module.exports = function(gulp, config, plugins){
	return function(done){
		gulp.src(['server/**/*.js'])
			.pipe(plugins.plumber())
			.pipe(plugins.istanbul())
    		.pipe(plugins.istanbul.hookRequire())
    		.on('finish', done);
	};
};