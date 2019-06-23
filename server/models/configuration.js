var mongoose=require('mongoose');

//Feed Schema

var configurationSchema=mongoose.Schema({
	updateTime:{
		type:String,
		required:true
	},
	expiryTime:{
		type:String,
		required:true
	}
},{collection: 'configuration'});

var Configuration=module.exports=mongoose.model('Configuration',configurationSchema);


module.exports.updateConfiguration=(configuration,options,callback)=>{
	var query={name:configuration.name};
	var update={
		updateTime:configuration.updateTime,
		expiryTime:configuration.expiryTime
	};
	Configuration.findOneAndUpdate(query,update,options,callback);
}