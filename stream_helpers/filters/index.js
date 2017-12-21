var chalk = require('chalk');

var streamFilter = function(tweet) {
  console.log(chalk.green(tweet.user.screen_name, ' : ' , tweet.text));
  console.log(chalk.blue(JSON.stringify(tweet,null,4)))
};

module.exports = streamFilter;