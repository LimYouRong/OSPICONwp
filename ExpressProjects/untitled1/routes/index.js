var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/button',function(req,res){

  var button=req.body.test;
  
  var Connection = require('tedious').Connection;
  var config = {
    userName: 'LYR  ',
    password: 'asd83ezvatZ',
    server: 'lyrdatabase.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'fypDB'}
  };
  var connection = new Connection(config);
  connection.on('connect', function(err) {
    // If no error, then good to proceed.

    console.log("Connected");
    executeStatement1();
  });

  var Request = require('tedious').Request
  var TYPES = require('tedious').TYPES;

  function executeStatement1() {
    request = new Request("  Insert dbo.systemrole output inserted.RoleId values (@rolename)", function(err) {
      if (err) {
        console.log(err);}
    });
    request.addParameter('rolename', TYPES.NVarChar,'RoleNameTest');

    request.on('row', function(columns) {
      columns.forEach(function(column) {
        if (column.value === null) {
          console.log('NULL');
        } else {
          console.log("Product id of inserted item is " + column.value);
        }
      });
    });
    connection.execSql(request);
  }

  res.end("Received value: " + button);

})

module.exports = router;
