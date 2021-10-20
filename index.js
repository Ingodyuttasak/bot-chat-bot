'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'yVkhxm9IviVHL0E+lIh/G+3wQy2E1pD8SAbDrDCjFQrZsHM4z6EnD3bNqKoxHvUZVPtwlCkmqAWAIua1HyZSdj1k/Xpozurpdw+jMHN3aW7+p31NuEkixpkzhCeWjxpvwAiTajmVUsYU+oCcN4mWMwdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'af0fbb8cde9ef94f4debb50a08efa3e1',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get('/',(req,res)=>{
  return res.status(200).json({
    status: 'sccess',
    message: 'Connected',
  })
})
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    console.log(`user ID: ${event.source.userId}`);
    // ignore non-text-message event
    return Promise.resolve(null);
    
  }
  
  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}




// listen on port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
