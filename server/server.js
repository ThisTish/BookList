const express = require('express');
const db = require('./config/connection');
const path = require('path');

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
	typeDefs,
	resolvers
})

const startApolloServer = async () => {
	await server.start()
	app.use('/graphql', expressMiddleware(server))
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}


startApolloServer().then(() => {
	app.listen(PORT, () => {
		console.log(`🌍 API server running on port:${PORT}`);
		console.log(`🌍 GraphQL on http://localhost:${PORT}/graphql`);
	})
});
