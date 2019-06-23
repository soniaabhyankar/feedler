const axios = require('axios');

const url = 'http://localhost:3000/api/syncFeed';



//syncFeed

let d = async function loadFeed() {
	const res = await axios.get(url);

	const data = res;

	console.log(data);
}



d();