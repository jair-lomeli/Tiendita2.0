'use strict';

module.exports = function(Ticket) {

	Ticket.CreateTicket =  function(ticket, callback){
	
	Ticket.create(ticket, (err, newTicket)=> {
		if (err) return callback(err)
		else return callback(newTicket)
	})

	};

};
