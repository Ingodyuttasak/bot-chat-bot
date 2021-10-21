require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');


const config = {
  channelAccessToken:process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};


const client = new line.Client(config);
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/testendpoint',(req,res)=>{
  return res.status(200).json({
    status: 'success',
    message :'Connected',
  })
})

app.post('/webhook',(req,res)=>{
  console.log('webhook request');
  console.log(req.body);
  
  replyToken = req.body.events[0].replyToken;
  msg = req.body.events[0];
  reply(replyToken,msg);
  res.send('Nice!!!')
})

//function ที่สร้างขึ้นเพื่อตอบกลับ user 
function reply(replyToken,msg){
  let headers = {
    'Content-type': 'application/json',
    'Authorization' : 'Bearer : process.env.CHANNEL_ACCESS_TOKEN '//channal access token
  }
  let body = JSON.stringify({
    replyToken: replyToken,
    messages : 0[
      {
      type: 'text',
      text :'Hello from webhook test',
      },
      {
      type: 'text',
      text : msg
      }
  ]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers : headers,
    body: body 
  },
  (err,res,body)=>{
    console.log(err);
    console.log('status = ' + res.statusCode);
  }
  )
}




//Server Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
