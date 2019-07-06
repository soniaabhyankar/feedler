var mongoose=require('mongoose');
var Provider=require('./provider');
//Connect to mongoose
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true});
var db=mongoose.connection;

//Feed Schema

var feedSchema=mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	link:{
		type:String,
		required:true
	},
	content:{
		type:String
	},
	publishedDate:{
		type:String,
		required:true
	},
	receivedDate:{
		type:String,
		required:true
	},
	imgSrc:{
		type:String
	},
	name:{
		type:String,
		required:true
	},
	websiteLink:{
		type:String
	}
},{collection: 'feed'});

var Feed=module.exports=mongoose.model('Feed',feedSchema);

module.exports.addFeed=(feed,callback)=>{
	Feed.create(feed,callback);
}

module.exports.deleteFeed=(id,callback)=>{
	var query={_id:id};
	Feed.remove(query,callback);
}

// getFeeds();