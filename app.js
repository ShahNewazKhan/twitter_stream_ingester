var Twitter = require('twitter');
var env = require('dotenv').config();

var streamFilter = require('./stream_helpers/filters');
var streamError = require('./stream_helpers/errors');

var client = new Twitter({
  consumer_key: env.parsed.consumer_key,
  consumer_secret: env.parsed.consumer_secret,
  access_token_key: env.parsed.access_token_key,
  access_token_secret: env.parsed.access_token_secret
});

client.stream('statuses/filter', { track: 'fintech' }, function (stream) {
  stream.on('data', streamFilter);
  stream.on('error', streamError);
});

