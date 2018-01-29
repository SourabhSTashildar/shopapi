var express = require('express');
var router = express.Router();
var Shop=require('../models/Shop');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shop Api' });
});

router.get('/product_lines',function(req,res,next){
	//q = search based on productLine
	Shop.productLines(req.query.q,req.query.limit,req.query.offset,function(err,rows){
 
		if(err){
			console.error(err.stack);
  			res.status(500).send('Something went wrong!');
		}else{
			res.send(rows);
		}
 
	});
});
router.get('/customers/:customer_id/:type',function(req,res,next){ 
	//q = search based on orderNumber
	if(!isNaN(req.params.customer_id)){//if customer id is a number
		if(req.params.type == 'orders'){//if parameter passed is orders
			Shop.customers(req.params.customer_id,req.query.q,req.query.limit,req.query.offset,function(err,rows){
				if(err){
					console.error(err.stack);
	  				res.status(500).send('Something went wrong!');
				}else{
					res.send(rows);
				}
			});
		}else{
			res.send('Please Enter a Valid Request Parameter!');
		}
	}else{
		res.send('Please Enter a Valid Customer Id!');
	}
	
});

router.get('/orders/:order_id?',function(req,res,next){
	//q = search based on productName
	if(req.params.order_id){//if order id passed
		if(!isNaN(req.params.order_id)){//if order id is a number
			Shop.orders(req.params.order_id,req.query.q,req.query.limit,req.query.offset,function(err,rows){
	 
				if(err){
					console.error(err.stack);
  					res.status(500).send('Something went wrong!');
				}else{
					res.send(rows);
				}
		 
			});
		}else{
			res.send('Please Enter a Valid Order Id!');
		}
	}else{
		res.send('Order Id Missing!');
	}
	
});

router.get('/products/:product_id?',function(req,res,next){
	//q = search based on productName
	Shop.products(req.params.product_id,req.query.q,req.query.limit,req.query.offset,function(err,rows){
	 
		if(err){
			console.error(err.stack);
  			res.status(500).send('Something went wrong!');
		}else{
			res.send(rows);
		}
 
	});
	
});

router.get('*', function(req, res){//if no matching urls found
  res.send('Please check the URL', 404);
});

module.exports=router;
