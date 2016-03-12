module.exports = function ( gulp , config , plugins ) {
  return function ( ) {
    gulp.watch( [ "server/**/*.js" , "tools/**/*.js" ] , [ "lint" ] );
  };
};