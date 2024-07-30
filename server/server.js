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

app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.originalUrl}`);
    console.log(`Request Body: ${JSON.stringify(req.body)}`);
    next(); // Call the next middleware or route handler
})

app.use(cors({
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware
})


const startApolloServer = async () => {
	await server.start()


	app.use('/graphql', expressMiddleware(server))

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/build')));
	}

	app.use(morgan('dev'))
	
	app.use((err, req, res, next) => {
		console.error('Unhandled Error:', err.message);
		console.error('Stack Trace:', err.stack);
		res.status(500).send('Internal Server Error');
	});

	db.once('open', () =>{
		app.listen(PORT, () => {
			console.log(`🌍 API server running on port:${PORT}`);
			console.log(`🌍 GraphQL on http://localhost:${PORT}/graphql`);
		})
	})
}



startApolloServer()
