const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql')
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
	AuthenticationError: new GraphQLError('Could not authenticate user.', {
		extensions: {
		code: 'UNAUTHENTICATED',
		}
	}),
	// function for our authenticated routes
	authMiddleware: ({req}) => {
		// allows token to be sent via  req.query or headers
		let token = req.query.token || req.headers.authorization || req.body.token
		console.log(`authmiddleware ${token}`)

		// ["Bearer", "<tokenvalue>"]
		if (token && req.headers.authorization) {
			token = token.split(' ').pop().trim();
		}

		if (!token) {
			return req
		}

		// verify token and get user data out of it
		try {
			const { data } = jwt.verify(token, secret, { maxAge: expiration });
			console.log(`auth data ${data}`)
			req.user = data
		} catch {
			console.log('Invalid token');
		}
		return req
		// send to next endpoint
	},

	signToken: function ({ username, email, _id }) {
		const payload = { username, email, _id };
		console.log(`signToken ${Object.values(payload)}`)

		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	}
};
