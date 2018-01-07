const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;  
app.use(express.static(__dirname + '/dist'));
 
//app.set('views', __dirname + '/dist');
//app.set('view engine', 'html');

app.get('/*', function(request, response) {
   //response.render('dist/index.html');
  response.sendFile(path.join(__dirname + '/dist/index.html'));
  //response.send("Hello World");
});

app.listen(port);

console.log('Server is running');
