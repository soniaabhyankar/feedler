var mongoose = require('mongoose');
var Feed = require('../../models/feed');
var Provider = require('../../models/provider');
var Configuration = require('../../models/configuration');

//Connect to mongoose
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
var db = mongoose.connection;


module.exports = fetchAll = (callback) => {
	// var providerData={};
	// var feedData={};
	// var configData={};
	var responseData = { response: {} };
	Provider.find({ subscribed: 1 }).exec((err, provider) => {
		responseData.response['providerData'] = provider;
		// console.log(provider);
		// console.log(responseData);
		var query = {};
		var queryBuilder = new Array();
		provider.forEach((result) => {
			var temp = {};
			temp['name'] = result.name;
			queryBuilder.push(temp);
		});
		query['$or'] = queryBuilder;

		Feed.find(query).exec((err, feed) => {
			responseData.response['feedData'] = feed;

			// console.log(responseData);
			Configuration.find().exec((err, config) => {
				responseData.response['config'] = config;
				// console.log(responseData);
				return callback(err, responseData);
			})
		})
	})
}
