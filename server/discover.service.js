var rp = require('request-promise');

module.exports = {
  "getService" : function ( serviceName ) {
    var options = { "method": "GET", "uri": "http://localhost:8500/v1/catalog/service/" + serviceName + "-lb", "json": true };

    // Hit consul service rest endpint
    return rp( options )
      .then(function(data){
          if ( data[ 0 ] ) {
            var service = {};
            service.serviceAddress = data[ 0 ].ServiceAddress;
            service.servicePort = data[ 0 ].ServicePort;
            return service;
          } else {
            console.error( serviceName + "Service is down\n" , err );
            throw new Error( serviceName + "Service is down" , err );
          }
      })
      .catch(function(err){
          console.error( "Service Discovery is down\n" , err );
          throw new Error( "Service Discovery is down" , err );
      });
  }
}