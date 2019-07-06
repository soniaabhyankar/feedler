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
const syncFeeds = function fetchProviders() {
	Provider.getProvider((err, provider) => {
		if (err) {
			throw err;
		}
		provider.forEach((element) => {
			fetchFeeds(element);
		});
	});
};

//fetching feed data
function fetchFeeds(element) {
	parseFeed(element.link).then((data) => extractData(element, data)).catch();
}

//extract data from webfeed
function extractData(element, data) {
	var counter = 0;
	var flag = false;
	var feedObj = new Object();
	var providerObj = new Object();
	Provider.updateProvider(element._id, data.items.length, {}, () => { })

	data.items.forEach(item => {

		Feed.find({ link: item.link }).exec((err, feed) => {
			if (feed.length != 0) { console.log("Duplicates not allowed " + item.link); }
			else {
				feedObj['title'] = item.title;
				feedObj['link'] = item.link;
				feedObj['publishedDate'] = item.pubDate;
				feedObj['receivedDate'] = moment().format().toString();
				feedObj['content'] = item.contentSnippet.replace('"', '');
				feedObj['imgSrc'] = getImgSrc("" + `${item.content}` + "");
				feedObj['name'] = element.name;
				feedObj['websiteLink'] = element.websiteLink;
				Feed.addFeed(feedObj);
				counter++;
				flag = true;
			}
		});
	})
	// providerObj['name']=element.name;
	// providerObj['lastUpdateDate']=moment().format().toString();
	// providerObj['lastRecordUD']=moment().format().toString();
	// providerObj['noOfRecords']=counter;
	// console.log(providerObj);
	// Provider.updateProvider(element._id,providerObj,flag,{},()=>{})
}

//parsing web feed 
async function parseFeed(link) {
	return await parser.parseURL(link);
}

function getImgSrc(str) {
	const dom = new JSDOM(str);
	try {
		return dom.window.document.querySelector("img").src;
	} catch (err) {
		return "";
	}
}
module.exports = syncFeeds;
