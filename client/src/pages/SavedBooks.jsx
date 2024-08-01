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
	const { loading, data, error } = useQuery(GET_ME, {
		context: {
			headers: {
			authorization: `Bearer ${Auth.getToken()}`,
			}
		}
	})

	const [ removeBook ] = useMutation(REMOVE_BOOK)

	const [userData, setUserData] = useState({savedBooks: []})

	useEffect(() =>{
		if(data) {
			setUserData(data.me)
		}
	},
	[data])



	// remove book
	const handleDeleteBook = async (bookId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;
		
		if (!token) {
			console.log('no token')
			return false;
		}
		try{	
			await removeBook({
				variables: { bookId },
				context:{
					headers:{
						authorization: `Bearer ${Auth.getToken()}`
					}
				}
			});

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
							<Col md="4">
								<Card key={book.bookId} border='dark'>
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
