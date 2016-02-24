module.exports = function(gulp, config, plugins){
	return function(){
		plugins.nodemon({
			script: 'server/server.js',
			ext: 'js json',
			watch: ['server/**/*.js', 'tools/**/*.js', 'tests/**/*.js'],
			env: { 'NODE_ENV': 'development' }
		});
	};
};