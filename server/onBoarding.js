var mongoose = require('mongoose');
var Provider = require('./models/provider');
var Configuration = require('./models/configuration');


//Connect to mongoose
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
var db = mongoose.connection;

var providerData = [
	{
		name: "Times Of India",
		link: "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
		lastUpdateDate: "",
		lastRecordUD: "",
		noOfRecords: "",
		type: "RSS",
		subscribed: 1,
		websiteLink: "https://timesofindia.indiatimes.com"
	},
	{
		name: "Verge",
		link: "https://www.theverge.com/rss/index.xml",
		lastUpdateDate: "",
		lastRecordUD: "",
		noOfRecords: "",
		type: "RSS",
		subscribed: 1,
		websiteLink: "https://www.theverge.com"
	},
	{
		name: "Vox",
		link: "https://www.vox.com/rss/index.xml",
		lastUpdateDate: "",
		lastRecordUD: "",
		noOfRecords: "",
		type: "Atom",
		subscribed: 1,
		websiteLink: "https://www.vox.com"
	},
	{
		name: "DailyWire",
		link: "https://www.dailywire.com/rss.xml",
		lastUpdateDate: "",
		lastRecordUD: "",
		noOfRecords: "",
		type: "RSS",
		subscribed: 1,
		websiteLink: "https://www.dailywire.com"
	},
	{
		name: "Space",
		link: "https://www.space.com/feeds/all",
		lastUpdateDate: "",
		lastRecordUD: "",
		noOfRecords: "",
		type: "RSS",
		subscribed: 1,
		websiteLink: "https://www.space.com"
	},
	{
		name: "Malfunction Link",
		link: "https://jsonplaceholder.typicode.com/posts",
		lastUpdateDate: "",
		lastRecordUD: "",
		noOfRecords: "",
		type: "",
		subscribed: 1,
		websiteLink: "https://jsonplaceholder.typicode.com"
	}
];

var configData = {
	name: "configuration",
	updateTime: 10,
	expiryTime: 30

};
module.exports = onBoarding = () => {
	Provider.create(providerData);
	Configuration.create(configData);
}