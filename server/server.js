const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection')

const morgan = require('morgan')
const cors = require('cors')


const app = express();
const PORT = process.env.PORT || 3001;



app.use(cors({
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type', 'Authorization']
}))


const server = new ApolloServer({
	typeDefs,
	resolvers
})


const startApolloServer = async () => {
	await server.start()

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.use('/graphql', expressMiddleware(server, {
		context: authMiddleware
	}))

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/build')));
	}

	app.use(morgan('dev'))
	


	db.once('open', () =>{
		app.listen(PORT, () => {
			console.log(`🌍 API server running on port:${PORT}`);
			console.log(`🌍 GraphQL on http://localhost:${PORT}/graphql`);
		})
	})
}



startApolloServer()
