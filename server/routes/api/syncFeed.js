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
	console.log('in syncfeed');
	Provider.getProvider((err, provider) => {
		if (err) {
			throw err;
		}
		provider.forEach((element) => {
			if (element.suscribed == true) {
				fetchFeeds(element.id, element.name, element.link);
			}
		});
	});
};

//fetching feed data
function fetchFeeds(id, name, link) {
	var data = parseFeed(link).then((data) => extractData(id, name, data)).catch();
}

//extract data from webfeed
function extractData(id, name, data) {
	// var img="img";
	var counter = 0;
	var feedObj = new Object();
	var providerObj = new Object();
	data.items.forEach(item => {

		// If link present in DB skip else insert
		// Feed.find({link:item.link},(result)=>{
		// 	if(result.link!=""){continue;}
		// }).then();

		Feed.find({ link: item.link }).exec((err, feed) => {
			if (feed.length != 0) { console.log("already present" + item.link); }
			else {
				feedObj['title'] = item.title;
				feedObj['link'] = item.link;
				feedObj['publishedDate'] = item.pubDate;
				feedObj['content'] = item.contentSnippet.replace('"', '');
				feedObj['imgSrc'] = "img";
				// feedObj['imgSrc']=getImgSrc(""+`${item.content}`+"");
				feedObj['name'] = name;

				Feed.addFeed(feedObj);
				counter++;
			}
		});
	})
	providerObj['name'] = name;
	providerObj['lastUpdateDate'] = moment().format().toString();
	// if(counter!=0){
	providerObj['lastRecordUD'] = moment().format().toString();
	// }
	providerObj['noOfRecords'] = counter;
	Provider.updateProvider(id, providerObj, {}, () => { })
}

//parsing web feed 
async function parseFeed(link) {
	return await parser.parseURL(link);
}

// function getImgSrc(str)
// {
// 	const dom = new JSDOM(str);
// 	console.log("IMG"+str);
// 	return dom.window.document.querySelector("img").src;
// console.log(dom.window.document.querySelector("img").src);
// }

// getImgSrc(`<a href="https://timesofindia.indiatimes.com/world/us/us-poised-to-tighten-sanctions-on-iran-over-terror-financing/articleshow/69896910.cms"><img border="0" hspace="10" align="left" style="margin-top:3px;margin-right:5px;" src="https://timesofindia.indiatimes.com/photo/69896910.cms" /></a>Amid rising tensions, after
// Iran shot down an American drone, US Prez Trump early Friday appeared to preview the tougher stance on Twitter, saying "Sanctions are biting & more added last
// night." Treasury secretary Steven Mnuchin said that the US is set to increase pressure on Iran for failing to head off funds to terrorists, threatening new sanctions if Tehran fails to comply.`);
module.exports = syncFeeds;


{/* <a href="https://timesofindia.indiatimes.com/world/middle-east/gave-2-warnings-before-downing-us-drone-iran/articleshow/69892371.cms"><img border="0" hspace="10" align="left" style="margin-top:3px;margin-right:5px;" src="https://timesofindia.indiatimes.com/photo/69892371.cms" /></a>
Brigadier General Amirali Hajizadeh  said that even pilotless drones, like the one shot down on Thursday, had systems to relay warnings and other communications to their operators thousands of kilometres (miles) away in the United States. */}
{/* <a href="https://timesofindia.indiatimes.com/world/europe/erdogan-in-lose-lose-situation-after-istanbul-vote-analysts/articleshow/69889946.cms"><img border="0" hspace="10" align="left" style="margin-top:3px;margin-right:5px;" src="https://timesofindia.indiatimes.com/photo/69889946.cms" /></a>Local elections around Turkey on March 31 showed the ruling party of President Recep Tayyip Erdogan remained the most popular overall, but it suffered a shock defeat in Istanbul, as well as losing the capital Ankara. It was the first time in 25 years that neither Istanbul nor Ankara were under the control of the Justice and Development Party (AKP) or its predecessors. */ }