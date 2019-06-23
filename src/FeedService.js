import axios from 'axios';

const url = 'http://localhost:3000/api/syncFeed';

class Feed {

	//syncFeed

	static loadFeed() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(url);
				const data = res.data.response.feedData;
				const ret = data.filter(a => a.content !== '')
				//const allowed = 'feedData';
				// const ret = Object.keys(data)
				// 	.filter(key => { key == 'feedData' });
				// .reduce((obj, key) => {
				// 	obj[key] = data[key];
				// 	return obj;
				// }, {});

				//const ret = data.filter(a => (a.feedData));
				resolve(ret);
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