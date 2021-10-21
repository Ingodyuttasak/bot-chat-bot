const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');

const app = express();

app.set('port',(process.env.PORT || 3000))

app.use('/',express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/hello',(req,res)=>{
  console.log(req);
  res.send("Hello from server port: "+app.get('port'));
})

app.post('/webhook',(req,res)=>{
  console.log(req.body)
})

app.listen(app.get('port'),function(){
  console.log('Server started : http/localhost:'+app.get('port')+'/')
})