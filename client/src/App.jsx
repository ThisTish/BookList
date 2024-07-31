import './App.css';
import Navbar from './components/Navbar';

import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
const client = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache(),
	onError: (error) => {
		console.log('apollo Client Error', error)
	}
})


function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Navbar />
				<Outlet />
			</ApolloProvider>
		</>
	);
}

export default App;
