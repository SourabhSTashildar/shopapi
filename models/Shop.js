var db=require('../dbconnection'); //reference of dbconnection.js
 
var Shop={
	product_lines:function(callback){
		return db.query("Select * from productlines",callback);
	}/*,
	customers:function(customer_id,type,callback){
		return db.query("select * from task where Id=?",[id],callback);
	}*/
};
module.exports=Shop;