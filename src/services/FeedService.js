import axios from 'axios';

const url = 'http://localhost:3000/api/syncFeed';

class Feed {

	//syncFeed

	static loadFeed() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(url);
				const data = res.data.response.feedData;
				const ret = data.filter(a => a.content !== '' && a.imgSrc !== '');
				resolve(ret);
			}
			catch (err) {
				reject(err);
			}
		})
	}
}
export default Feed;
