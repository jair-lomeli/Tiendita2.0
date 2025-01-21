'use strict';

module.exports = function(Users) {

Users.GetoneUsers = function(callback){
	Users.find({},(err, User)=>{
		if(err){
			console.error('Error', err);
		} else {
			console.log ('Usuario encontrado',user);
		}
	});
 }

 Users.GetallUsers = function(callback){

	Users.find({}, (err, users)=> {
		console.log(users)
		if (err) return callback(err)
		else return callback(users)
	})
}
};
