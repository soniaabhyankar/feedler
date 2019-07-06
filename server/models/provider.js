var mongoose=require('mongoose');
var moment=require('moment');
var Feed=require('./feed');

//Connect to mongoose
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true});
var db=mongoose.connection;

//Provider Schema

var providerSchema=mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	link:{
		type:String,
		required:true
	},
	lastUpdateDate:{
		type:String
	},
	lastRecordUD:{
		type:String
	},
	noOfRecords:{
		type:Number,
		default:0
	},
	type:{
		type:String,
		default:true,
		default:"RSS"
	},
	subscribed:{
		type:Number,
		default:1
	},
	websiteLink:{
		type:String
	}
},{collection: 'provider'});

var Provider=module.exports=mongoose.model('provider',providerSchema);

module.exports.getProvider=(callback,limit)=>{
	Provider.find(callback).limit(limit);
}

module.exports.deleteProvider=(id,callback)=>{
	var query={_id:id};
	Provider.deleteOne(query,callback);
}

module.exports.addProvider=(provider,callback)=>{
	Provider.create(provider,callback);
}

module.exports.updateProvider=(id,count,options,callback)=>{
	var query={_id:id};
	var update={
			lastUpdateDate:moment().format().toString(),
			lastRecordUD:moment().format().toString(),
			noOfRecords:count
			};
	Provider.updateOne(query,update,options,callback);
}	


module.exports.updateProviderName=(id,provider,options,callback)=>{
	var query={_id:id};
	var update={
		name:provider.name
	};
	Provider.updateOne(query,update,options,callback);
}

module.exports.updateProviderSubscription=(id,options,callback)=>{
	var query={_id:id};
	var update;
	Provider.find(query).exec((err,result)=>{
		update=(result.suscribed==1)?update={suscribed:0}:update={suscribed:1};
			Provider.updateOne(query,update,options,callback);
	})
}