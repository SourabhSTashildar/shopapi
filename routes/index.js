var express = require('express');
var router = express.Router();
var Shop=require('../models/Shop');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
 
router.get('/product_lines',function(req,res,next){ 
	Shop.product_lines(function(err,rows){
 
		if(err){
			res.json(err);
		}else{
			res.json(rows);
		}
 
	});
});

module.exports=router;
