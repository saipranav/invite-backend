var discoverService = require( "./discover.service" );
var findPersonByEmail = "http://{host}:{port}/api/persons/{id}/exists";
var triggerEmail = "http://{host}:{port}/api/mails";

module.exports.getPersonByEmail = function ( employeeEmail ) {
  return discoverService.getService( "person" )
  .then(function(data){
  	var url = findPersonByEmail.replace( "{host}" , data.serviceAddress ).replace( "{port}" , data.servicePort );
  	return url.replace( "{id}" , employeeEmail );
  });
};

module.exports.triggerEmail = function ( ) {
  return discoverService.getService( "mailer" )
  .then(function(data){
  	var url = triggerEmail.replace( "{host}" , data.serviceAddress ).replace( "{port}" , data.servicePort );
  	return url;
  });
};