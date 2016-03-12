module.exports = function ( gulp , config , plugins ) {
  return function ( ) {
    gulp.src( [ "server/**/*.js" ,
                "tests/**/*.js" ,
                "tools/**/*.js" ,
                "gulpfile.js" ] )
        .pipe( plugins.plumber() )
        .pipe( plugins.jscs() )
        .pipe( plugins.jscs.reporter() );
  };
};