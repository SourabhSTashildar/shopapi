var express = require('express');
var router = express.Router();
var Shop=require('../models/Shop');

router.get('/product_lines',function(req,res,next){ 
	Shop.productLines(req.query.q,req.query.limit,req.query.offset,function(err,rows){
 
		if(err){
			//res.json(err);
			console.error(err.stack);
  			res.status(500).send('Something went wrong!');
		}else{
			//res.json(rows);
			res.send(rows);
		}
 
	});
});
router.get('/customers/:customer_id/:type',function(req,res,next){ 
	if(!isNaN(req.params.customer_id)){
		Shop.customers(req.params.customer_id,req.query.q,req.query.limit,req.query.offset,function(err,rows){
 
			if(err){
				//res.json(err);
				console.error(err.stack);
  				res.status(500).send('Something went wrong!');
			}else{
				//res.json(rows);
				res.send(rows);
			}
	 
		});
	}else{
		res.send('Please Enter a Valid Customer Id!');
	}
	
});

router.get('/orders/:order_id?',function(req,res,next){
	if(req.params.order_id){
		if(!isNaN(req.params.order_id)){
			Shop.orders(req.params.order_id,req.query.q,req.query.limit,req.query.offset,function(err,rows){
	 
				if(err){
					//res.json(err);
					console.error(err.stack);
  					res.status(500).send('Something went wrong!');
				}else{
					//res.json(rows);
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

	Shop.products(req.params.product_id,req.query.q,req.query.limit,req.query.offset,function(err,rows){
	 
		if(err){
			//res.json(err);
			console.error(err.stack);
  			res.status(500).send('Something went wrong!');
		}else{
			//res.json(rows);
			res.send(rows);
		}
 
	});
	
});

module.exports=router;
