module.exports = function(gulp, config, plugins){
	return function(){
		gulp.watch(['server/**/*.js', 'tools/**/*.js', 'tests/**/*.js'], ['lint', 'unit-tests']);
	};
};