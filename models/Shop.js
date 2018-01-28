var db=require('../dbconnection'); //reference of dbconnection.js
 
var Shop={
	/*
		q = search string
		l = limit
		o = offset
	*/
	productLines:function(q,l,o,callback){
		var sql = 'Select * from productlines';
		if(q!=''){
			sql += ' where productLine like "%'+q+'%"';
		}

		showData(sql,l,o,callback);
	},
	customers:function(customer_id,q,l,o,callback){
		var sql = 'select c.customerNumber,c.customerName,c.contactLastName,c.contactFirstName,c.phone,c.addressLine1,c.addressLine2,c.city,c.state,c.postalCode,c.country,o.orderNumber,o.orderDate,o.requiredDate,o.shippedDate,o.status,o.comments,SUM(od.quantityOrdered * od.priceEach) as total from orders o left join customers c on c.customerNumber= o.customerNumber left join orderdetails od on od.orderNumber = o.orderNumber where c.customerNumber='+customer_id+' group by o.orderNumber';
		if(q!=''){
			sql += ' having o.orderNumber like "%'+q+'%"';
		}

		showData(sql,l,o,callback);
	},
	orders:function(order_id,q,l,o,callback){
		var sql = 'select table1.*,p.productName,p.productLine from (select c.customerNumber,c.customerName,c.contactLastName,c.contactFirstName,c.phone,c.addressLine1,c.addressLine2,c.city,c.state,c.postalCode,c.country,o.orderNumber,o.orderDate,o.requiredDate,o.shippedDate,o.status,o.comments,od.productCode,od.quantityOrdered,od.priceEach,SUM(od.quantityOrdered * od.priceEach) as total from orders o left join customers c on c.customerNumber= o.customerNumber left join orderdetails od on od.orderNumber = o.orderNumber where o.orderNumber='+order_id+' group  by od.productCode) as table1 left join products p on table1.productCode = p.productCode';
		if(q!=''){
			sql += ' having p.productName like "%'+q+'%"';
		}

		showData(sql,l,o,callback);
	},
	products:function(product_id,q,l,o,callback){
		var sql = 'Select * from products where 1';
		if(product_id!='' && product_id!==undefined){
			sql += ' and productCode = "'+product_id+'"';
		}
		if(q!=''){
			sql += ' and productName like "%'+q+'%"';
		}
		showData(sql,l,o,callback);
	}
};

/*
	Get data as well as total row count for pagination
*/
function showData(sql,l,o,callback){
	//get total row count
	db.query(sql,function(err,rows){
		if(err){
			callback(err,rows);
		}else{
			var total = rows.length;

			//get the result set
			if(l!='' && o!='')
				sql += ' limit '+o+','+l;

			db.query(sql,function(err,rows){
				if(err){
					callback(err,rows);
				}else{
					var msg = {};
					msg['data'] = rows;
					msg['total'] = total;

					callback(err,JSON.stringify(msg));
				}
			});
		}
	});
}

module.exports=Shop;