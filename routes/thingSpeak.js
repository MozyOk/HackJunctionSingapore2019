var express = require('express');
var axios = require('axios');
var router = express.Router();

/* POST users listing. */
router.post('/', function(req, res, next) {

  let url = 'https://api.thingspeak.com/channels/873996/feeds.json?api_key=VZFNNIIWYKRTW974&results=2';

  axios.get(url).then(aRes => {
    
    let thingspeakData = aRes.data;
    
    let latestData = thingspeakData.feeds[thingspeakData.feeds.length-1].field1;
    let userName = ""

    if( latestData >= 35){
      userName = "Moussa"
    }
    else{
      userName = "Nassim"
    }

    let textResponse = `Hi ${userName}, What are u want to buy Today?`;
    res.send(createTextResponse(textResponse));

  }).catch((err) => {
    console.log(err);
  });
});

function createTextResponse(textResponse){
  let response = {
    "fulfillmentText": "This is a text response",
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            textResponse
          ]
        }
      }
    ],
    "source": "example.com",
    "payload": {
      "viber": {
        "text": "Hello, Viber!"
      }
    }
  }
  return response;
}

module.exports = router;
