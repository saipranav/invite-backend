var findPersonByEmail = "http://localhost:3001/api/persons/{id}";
var triggerEmail = "http://localhost:3003/api/mails";

module.exports.getPersonByEmail = function ( employeeEmail ) {
  return findPersonByEmail.replace( "{id}" , employeeEmail );
};

module.exports.triggerEmail = function ( ) {
  return triggerEmail;
};