# twitter_stream_ingester
A nodejs service that ingests a twitter stream and publishes to GCP PubSub.

##To wire it properly to GCP, create a `.env` file in the root directory and pupulate it with:

```
consumer_key=lkjOKJG309lkjhLKHOYlkj
consumer_secret=l4309iulkanvajd09lk24lkn,.mn
access_token_key=lknlkjhkjbliuypo8ugjhdsf3wrqwecfw4
access_token_secret=ojoiy09808yijbaksjdh;ifau0p8uo;ih;ljh
gcloud_project=gcp-project-name
pubsub_api_key=lkjab5reafasdfasdfasdf
pubsub_topic=fintech-tweets
```

Where consumer_key, consumer_secret, access_token_key & access_token_secret are Twitter Streaming API credentials & the rest are GCP keys.

##To run the app
```
nodemon app.js
```
