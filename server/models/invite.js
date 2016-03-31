var rp = require('request-promise');
var serviceEndpoint = require( "../serviceEndpoints" );

var emailRegex = /^([a-z|0-9](\.|_){0,1})+[a-z|0-9]\@([a-z|0-9])+((\.){0,1}[a-z|0-9]){2}\.[a-z]{2,3}$/ig;

module.exports = function ( Invite ) {
  Invite.observe( "before save" , function ( ctx , next ) {
    var emailId = ctx.instance.email;

    // Hit the person endpoint to check for person
    serviceEndpoint.getPersonByEmail( emailId )
      .then( function(url){
        var options = { "method": "GET", "uri": url, "json": true };
        rp( options )
          .then( function(data){
            if(data.exists == true){
              checkTheDatabaseForId( Invite , emailId , next );
            }
            else{
              var err = new Error( "Invitee is not present in To Be Invited List" );
              err.statusCode = 400;
              next( err );
            }
          });
      })
      .catch( function(err){
        console.log("Person service not found or Service Discovery is down");
        err.statusCode = 500;
        next( err );
      });

  });

  Invite.validatesFormatOf( "email" , {
                              "message" : "Provide a valid email address" ,
                              "with" : emailRegex
                            } );

};

// Check the database for same Id in Invite
function checkTheDatabaseForId ( Invite , emailId , next ) {
  Invite.findById( emailId )
    .then(function(invite){
      if ( null != invite ) {
        console.error( "Already triggered an invite for " , invite.email );
        var error = new Error( "Already triggered an invite" );
        error.statusCode = 400;
        next( error );
      } else {
        triggerInvite( emailId , next );
      }
    })
    .catch(function(err){
      console.error( "Error in checking Invite already exists\n" , err );
      next( err );
    });
}

function triggerInvite ( emailId , next ) {

  // Remove the line after implementing apache kafka message queue
  next();

  serviceEndpoint.triggerEmail()
    .then(function(url){
      var options = { "method": "POST" ,
        "uri": url,
        "form" : {
            "bcc" : [ process.env.ROOM_TO_BOOK ] ,
            "from" : "saipranav.ravichandran@listertechnologies.com" ,
            "html" : "invite" ,
            "subject" : "FASTEST KT INVITE TEST" ,
            "to" : [ emailId ]
        } ,
        "json" : true
      };

      // Trigger the mail
      rp( options )
        .then( function( data ){
          if(data.id){
            console.log("Mail sent");
            // Implement message queue like apache kafka then uncomment
            // next();
          }
        })
        .catch( function( err ){
            console.error( "Problem in sending Email\n" , err );
            // Implement message queue like apache kafka then uncomment
            // next(error);
        });

    })
    .catch(function(err){
      console.error( "Email Service is down\n");
      var error = new Error( "Error in sending invite from Invite service" );
      error.statusCode = 500;

      // Implement message queue like apache kafka then uncomment
      // next(error);
    });
}


/*function checkTheDatabaseForId ( Invite , emailId , next ) {
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
}*/