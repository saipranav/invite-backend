var request = require( "request" );
var serviceEndpoint = require( "../serviceEndpoints" );

var emailRegex = /^([a-z|0-9](\.|_){0,1})+[a-z|0-9]\@([a-z|0-9])+((\.){0,1}[a-z|0-9]){2}\.[a-z]{2,3}$/ig;

module.exports = function ( Invite ) {
  Invite.observe( "before save" , function ( ctx , next ) {
    var emailId = ctx.instance.email;
    console.log( emailId + " <= Invite Email ID" );

    // Hit person rest endpint and check for email in response
    request( serviceEndpoint.getPersonByEmail( emailId ) , function ( err ,
                                                                      res ,
                                                                      body ) {
      if ( err ) {
        console.error( "Person Service is down\n" , err );
        var error = new Error( "Error in getting person by Id from Person service" );
        error.statusCode = 500;
        next( error );
      }

      if ( JSON.parse( body ).email ) {
        checkTheDatabaseForId( Invite , emailId , next );
      } else {
        var error = new Error( "Invitee is not present in To Be Invited List" );
        error.statusCode = 400;
        console.error( ctx.instance , error.toString() );
        next( error );
      }

    } );
  } );

  Invite.validatesFormatOf( "email" , {
                              "message" : "Provide a valid email address" ,
                              "with" : emailRegex
                            } );
};

// Check the database for same Id in Invite
function checkTheDatabaseForId ( Invite , emailId , next ) {
  Invite.findById( emailId , function ( err , invite ) {
    if ( err ) {
      console.error( "Error in checking Invite already exists\n" , err );
      next( err );
    } else {
      if ( null != invite ) {
        console.error( "Already triggered an invite for " , invite.email );
        var error = new Error( "Already triggered an invite" );
        error.statusCode = 400;
        next( error );
      } else {
        triggerInvite( emailId , next );
      }
    }
  } );
}

function triggerInvite ( emailId , next ) {

  // Hit person rest endpint and check for email in response
  request.post( {
    "form" : {
      "bcc" : [ "daffodil@listertechnologies.com" ] ,
      "from" : "saipranav.ravichandran@listertechnologies.com" ,
      "html" : "invite" ,
      "subject" : "FASTEST KT INVITE TEST" ,
      "to" : [ emailId ]
    } ,
    "headers" : { "content-type" : "application/json" } ,
    "url" : serviceEndpoint.triggerEmail()
  } , function ( err , res , body ) {
    if ( err ) {
      console.error( "Email Service is down\n" , err );
      var error = new Error( "Error in sending invite from Invite service" );
      error.statusCode = 500;

      // Implement message queue like apache kafka then uncomment
      // next(error);
    }

    if ( JSON.parse( body ).id ) {

      // Implement message queue like apache kafka then uncomment
      // next();
    } else {
      var error = new Error( "Error in sending invite from Invite service" );
      error.statusCode = 400;
      console.error( error.toString() );

      // Implement message queue like apache kafka then uncomment
      // next(error);
    }
  } );

  // Remove the line after implementing apache kafka message queue
  next();
}