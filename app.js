const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Feed = require('./server/models/feed');
const Provider = require('./server/models/provider');
const Configuration = require('./server/models/configuration');
const syncFeeds = require('./server/routes/api/syncFeed');
const fetchAll = require('./server/routes/api/fetchAll');

// Middleware
app.use(bodyParser.json());

app.use(cors());

//Connect to mongoose
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
var db = mongoose.connection;

app.post('/api/newProvider', (req, res) => {
	Provider.addProvider(req.body, (err, provider) => {
		if (err) {
			throw err;
		}
		res.json(provider);
	})
});

app.get('/api/syncFeed', (req, res) => {
	if (true) {
		syncFeeds();
	}
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
	console.log("api");
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
app.listen(3000);
console.log('Running on port 3000');