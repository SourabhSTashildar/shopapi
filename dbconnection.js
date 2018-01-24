var mysql=require('mysql');
 var connection=mysql.createPool({
 
host:'sql12.freesqldatabase.com',
 user:'sql12217481',
 password:'iWmESMGlxD',
 database:'sql12217481'
 
});
 module.exports=connection;