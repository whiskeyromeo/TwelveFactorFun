var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGO_URI, function(err, db) {
	if (err) {
		console.log('Couldn\'t connect to mongoDB : ', err);
	} else {
		console.log('Connected to mongoDB');
	}
});
