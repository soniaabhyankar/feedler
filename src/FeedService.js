import axios from 'axios';

const url = 'http://localhost:3000/api/syncFeed';

class Feed {

	//syncFeed

	static loadFeed() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(url);
				const data = res.data.response.feedData;
				// const ret = data.map(obj => obj.content.length >= 500 ? obj.content.substring(1, 200) : obj.content).filter(a => a.content !== '');
				const ret = data.filter(a => a.content !== '');
				//const allowed = 'feedData';
				// const ret = Object.keys(data)
				// 	.filter(key => { key == 'feedData' });
				// .reduce((obj, key) => {
				// 	obj[key] = data[key];
				// 	return obj;
				// }, {});

				//const ret = data.filter(a => (a.feedData));

				// if (a.content.length >= 200) {
				// 	a.content.length
				// }
				resolve(ret);
			}
			catch (err) {
				reject(err);
			}
		})
	}

	static subscribeProvider(providerID, flag) {
		return new Promise(async (resolve, reject) => {
			try {
				console.log('in serv');
				const res = await axios.get(url);
				const data = res.data.response.FeedData;
				var obj;
				if (!flag) {
					obj = data.filter(item => item._id === providerID);
					console.log('in serv if');
				}
				else {
					resolve(data);
				}
				resolve(obj);
			}
			catch (err) {
				reject(err);
			}
		})
	}

}
export default Feed;

// class Feed {

// 	static async load() {
// 		const res = await axios.get(url);

// 		const data = res.data.response.feedData;

// 		console.log(data);
// 		return data;
// 	}
// }

// export default Feed;