module.exports = function(gulp, config, plugins){
	return function(){
		gulp.src(['tests/**/*.test.js'])
			.pipe(plugins.plumber())
			.pipe(plugins.wait(2000))
    		.pipe(plugins.mocha())
    		.pipe(plugins.istanbul.writeReports())
    		.pipe(plugins.istanbul.enforceThresholds({ thresholds: { global: 90 } }));
	};
};