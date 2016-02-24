var request = require("request");
var serviceEndpoint = require("../serviceEndpoints");

var emailRegex = /^([a-z|0-9](\.|_){0,1})+[a-z|0-9]\@([a-z|0-9])+((\.){0,1}[a-z|0-9]){2}\.[a-z]{2,3}$/ig;

module.exports = function(Invite) {
	Invite.observe("before save", function(ctx, next){
		var emailId = ctx.instance.email;
		console.log(emailId+'emailID');
		// Hit person rest endpint and check for email in response
		request(serviceEndpoint.getPersonByEmail(emailId), function(err, res, body) {
			if(err){
				console.error("Person Service is down\n", err);
				var error = new Error("Error in getting person by Id from Person service");
				error.statusCode = 500;
				next(error);
			}
			if(JSON.parse(body).email){
				checkTheDatabaseForId(Invite, emailId, next);
			}
			else{
				var error = new Error("Invitee is not present in To Be Invited List");
				error.statusCode = 400;
				console.error(ctx.instance, error.toString());
				next(error);
			}
		});

	});

	Invite.validatesFormatOf("email", {with: emailRegex, message: "Provide a valid email address"});
};

// Check the database for same Id in Invite
function checkTheDatabaseForId(Invite, emailId, next){
	Invite.findById(emailId, function(err, invite){
		if(err){
			console.error("Error in checking Invite already exists\n", err);
			next(err);
		}
		else{
			if(invite != null){
				console.error("Already triggered an invite for ", invite.email);
				var error = new Error("Already triggered an invite");
				error.statusCode = 400;
				next(error);
			}
			else{
				next();
			}
		}
	});
}