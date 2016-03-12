module.exports = function ( gulp , config , plugins ) {
  return function () {
    plugins.nodemon( {
      "env" : { "NODE_ENV" : "development" } ,
      "ext" : "js json" ,
      "script" : "server/server.js" ,
      "watch" : [ "server/**/*.js" , "tools/**/*.js" ]
    } );
  };
};