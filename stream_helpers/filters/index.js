var chalk = require('chalk');
var env = require('dotenv').config();
var request = require('request');

// var PubSub = require('@google-cloud/pubsub');

// const pubsub_client = PubSub({
// 	projectId: env.parsed.gcloud_project,
// 	key: env.parsed.pubsub_api_key
// });

// const topic =  pubsub_client.topic(env.parsed.pubsub_topic);
// const publisher = topic.publisher();

// Setup kafka producer client
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);

var streamFilter = function(tweet) {
  console.log(chalk.green(tweet.user.screen_name, ' : ' , tweet.text));
  request({
    method: 'POST',
    uri: 'http://127.0.0.1:5000/get_sent/',
    form: {text: tweet.text},
    json: true
  },
  function (error, response, body) {
    if (error) {
      return console.error(error);
    }
    
    console.log(body);

    tweet.sentiment = body
    const dataBuffer = Buffer.from(JSON.stringify(tweet));
    var attributes = {eventType: 'FINTECH_TWEET'};

    // publisher.publish(dataBuffer, attributes)
    // .then((results) => {
    //   var messageId = results[0];
    //   chalk.orange('Message %s published for kb_snapshot %s', messageId, tweet.id);
    // })
    // .catch((err)=>{
    //   chalk.red(JSON.stringify(err, null, 4))
    // })
  })
};

module.exports = streamFilter;