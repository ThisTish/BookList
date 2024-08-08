import { useState, useEffect } from 'react';
import {
	Container,
	Card,
	Button,
	Row,
	Col
} from 'react-bootstrap';
import Auth from '../utils/auth';
import { GET_ME } from '../utils/queries'
import { REMOVE_BOOK } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client'



// get saved books/user page
const SavedBooks = () => {
	const [userData, setUserData] = useState({})

	const userDataLength = Object.keys(userData).length
console.log(userDataLength)
		const getUserData = async() => {
			try{
				const token = Auth.loggedIn() ? Auth.getToken() : null
				if(!token){
					console.log(`no token in getting userData`)
					return false
				} 
				const { loading, data, error } = useQuery(GET_ME, {
					context: {
						headers: {
							authorization: `Bearer ${token}`,
						}
					}
				})
				if(!data) {
					throw new Error(`error with authorizing while getting userData`)
				}
				setUserData(data.me)
				
		}catch(err){
			console.log(`Error in getting user data: ${err}`)
		}
	
		
	}


	
	const [ removeBook ] = useMutation(REMOVE_BOOK)

	
	// remove book
	const handleDeleteBook = async (bookId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;
		if (!token) {
			console.log('no token')
			return false;
		}
		console.log(`bookId in handledelete ${bookId}`)
		console.log(token)
		try{	
			console.log(`trying to remove`)
			const { data } = await removeBook({
				variables: { bookId },
				context:{
					headers:{
						authorization: `Bearer ${token}`
					}
				}
			});
			console.log(`removed book: ${data.removeBook}`)

			setUserData((prevData) => ({
				...prevData,
				savedBooks: prevData.savedBooks.filter((book) => book.bookId !== bookId)
			}))
		} catch (err) {
			console.error(err);
		}
	};


	//render Component
	return (
		<>
			<div fluid="true" className="text-light bg-dark p-5">
				<Container>
					<h1>Viewing saved books!</h1>
				</Container>
			</div>
			<Container>
				<h2 className='pt-5'>
					{userData.savedBooks.length
						? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
						: 'You have no saved books!'}
				</h2>
				<Row>
					{userData.savedBooks.map((book) => {
						return (
							<Col md="4" key={book.bookId} >
								<Card border='dark'>
									<h1>{book.bookId}</h1>
									{book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
									<Card.Body>
										<Card.Title>{book.title}</Card.Title>
										<p className='small'>Authors: {book.authors}</p>
										<Card.Text>{book.description}</Card.Text>
										<Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
											Delete this Book!
										</Button>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
};

export default SavedBooks;
