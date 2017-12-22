var chalk = require('chalk');
var env = require('dotenv').config();

var PubSub = require('@google-cloud/pubsub');

const pubsub_client = PubSub({
	projectId: env.parsed.gcloud_project,
	key: env.parsed.pubsub_api_key
});

const topic =  pubsub_client.topic(env.parsed.pubsub_topic);
const publisher = topic.publisher();

var streamFilter = function(tweet) {
  console.log(chalk.green(tweet.user.screen_name, ' : ' , tweet.text));
  //console.log(chalk.blue(JSON.stringify(tweet,null,4)));

  const dataBuffer = Buffer.from(JSON.stringify(tweet));
  var attributes = {eventType: 'FINTECH_TWEET'};

  publisher.publish(dataBuffer, attributes)
  .then((results) => {
    var messageId = results[0];
    chalk.orange('Message %s published for kb_snapshot %s', messageId, tweet.id);
  })
  .catch((err)=>{
    chalk.red(JSON.stringify(err, null, 4))
  })

};

module.exports = streamFilter;