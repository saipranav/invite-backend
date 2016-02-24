var findPersonByEmail = "http://localhost:3001/api/persons/{id}";

module.exports.getPersonByEmail = function(employeeEmail){
	return findPersonByEmail.replace("{id}", employeeEmail);
}