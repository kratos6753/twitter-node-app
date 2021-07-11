const got = require('got')

const accessToken = process.env.BEARER_TOKEN
console.log('accessToken : ' + accessToken)

getTwitterUserIdWithOAuth2()
	.then((userId) => { console.log('userId: ' + userId); getTweetsPromise(userId); })
	.catch(err => console.error(err) && process.exit(1))


function getTweetsPromise(userId) {
	return getTweetsOfUser(userId)
		.then(tweets => console.log(JSON.stringify(tweets, null, 2)))
		.catch(err => console.error(err) && process.exit(1))
}


async function getTweetsOfUser(userId) {
	return got(`https://api.twitter.com/2/users/${userId}/tweets`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((res) => JSON.parse(res.body))
}

async function getTwitterUserIdWithOAuth2(username = 'MKBHD') {
	return got(`https://api.twitter.com/2/users/by?usernames=${username}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((res) => JSON.parse(res.body)["data"][0]["id"])
}