var mongoose=require('mongoose');
var moment=require('moment');

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
	suscribed:{
		type:Boolean,
		default:true
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

module.exports.updateProvider=(id,provider,options,callback)=>{
	var query={_id:id};
	var update="";
	if(provider.noOfRecords==0){
		update={
			lastUpdateDate:provider.lastUpdateDate,
			noOfRecords:provider.noOfRecords
		};
	}
	else{
		update={
			lastUpdateDate:provider.lastUpdateDate,
			lastRecordUD:provider.lastRecordUD,
			noOfRecords:provider.noOfRecords
		};
	}
	Provider.updateOne(query,update,options,callback);
}


module.exports.updateProviderName=(id,provider,options,callback)=>{
	var query={_id:id};
	var update={
		name:provider.name
	};
	Provider.updateOne(query,update,options,callback);
}

module.exports.updateProviderSubscription=(id,provider,options,callback)=>{
	var query={_id:id};
	var update={
		suscribed:!suscribed
	};
	Provider.updateOne(query,update,options,callback);
}