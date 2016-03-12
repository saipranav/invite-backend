var gulp = require ( "gulp" );
var plugins = require ( "gulp-load-plugins" ) ();
var config = require ( "./tools/config" );

function getTask ( taskName ) {
  return require ( "./tools/gulp-tasks/" + taskName ) ( gulp ,
                                                        config ,
                                                        plugins );
}

gulp.task( "lint" , getTask( "lint" ) );

gulp.task( "watch.development" , getTask( "watch.development" ) );

gulp.task( "watch.test" , getTask( "watch.test" ) );

gulp.task( "serve.development" , getTask( "serve.development" ) );

gulp.task( "serve.test" , getTask( "serve.test" ) );

gulp.task( "unit.tests" , getTask( "unit.tests" ) );

gulp.task( "pre.test" , getTask( "pre.test" ) );

gulp.task( "development" , plugins.sequence( [ "lint" ,
                                              "watch.development" ] ,
                                              "serve.development" ) );

gulp.task( "unit-test" , plugins.sequence( [ "lint" ,
                                            "watch.test" ,
                                            "pre.test" ] ,
                                            "serve.test" ,
                                            "unit-tests" ) );