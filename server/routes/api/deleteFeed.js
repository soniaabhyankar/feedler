var mongoose = require('mongoose');
var Feed = require('../../models/feed');
var Provider = require('../../models/provider');
let Parser = require('rss-parser');
let parser = new Parser();
var moment = require('moment');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;


//Connect to mongoose
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
var db = mongoose.connection;

//fetching provider name and link from database
const deleteFeed = function deleteFeeds(callback) {
	var date = "15/08/2019";
	var query = { receivedDate: date };
	Feed.deleteOne(query, callback);

	console.log("Feed which exceed 30 days has been deleted successfully");
};

module.exports = deleteFeed;
