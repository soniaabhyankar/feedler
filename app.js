var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Feed = require('./server/models/feed');
var Provider = require('./server/models/provider');
var Configuration = require('./server/models/configuration');
var syncFeeds = require('./server/routes/api/syncFeed');
var deleteFeed = require('./server/routes/api/deleteFeed');
var fetchAll = require('./server/routes/api/fetchAll');
var onBoarding = require('./server/onBoarding')

const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());
//Connect to mongoose
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
var db = mongoose.connection;
var time = 0;

app.post('/api/newProvider', (req, res) => {
	Provider.addProvider(req.body, (err, provider) => {
		if (err) {
			throw err;
		}
		res.json(provider);
	})
});
app.get('/api/syncFeed', (req, res) => {
	if (time == 0) {
		time = time + 1;
		setTimeout(function () { time = 0; }, 60000);

		syncFeeds();
	}

	deleteFeed((err, deleterecord) => { });
	fetchAll((err, responseData) => {
		if (err) {
			throw err;
		}
		res.json(responseData);
	})
});


app.put('/api/renameProvider/:_id', (req, res) => {
	var id = req.params._id;
	Provider.updateProviderName(id, req.body, (err, provider) => { })
	fetchAll((err, responseData) => {
		if (err) {
			throw err;
		}
		res.json(responseData);
	})
});


app.put('/api/subscription/:_id', (req, res) => {
	var id = req.params._id;
	Provider.updateProviderSubscription(id, (err, provider) => { })
	fetchAll((err, responseData) => {
		if (err) {
			throw err;
		}
		res.json(responseData);
	})
});

app.delete('/api/deleteProvider/:_id', (req, res) => {
	var id = req.params._id;
	Provider.deleteProvider(id, (err, provider) => { })
	fetchAll((err, responseData) => {
		if (err) {
			throw err;
		}
		res.json(responseData);
	})
});

app.put('/api/configuration', (req, res) => {
	Configuration.updateConfiguration(req.body, (err, configuration) => {
		if (err) {
			throw err;
		}
		res.json(configuration);
	})
});

onBoarding();
app.listen(3000);
console.log('Running on port 3000');