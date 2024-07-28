import './App.css';
import Navbar from './components/Navbar';

import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'

// import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
	const client = new ApolloClient({
		uri: 'http://localhost:3001/graphql',
		cache
	})


function App() {
  return (
    <>
		<ApolloProvider client={client}>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<SearchBooks />}/>
					<Route path='/saved' element={<SavedBooks />}/>
				</Routes>

			</Router>
      {/* <Outlet /> */}
	  </ApolloProvider>
    </>
  );
}

export default App;
