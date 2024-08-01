import { gql } from '@apollo/client'

const LOGIN_USER = gql`
	mutation LoginUser(
		$email: String!,
		$password: String!
	){
		login(
			email: $email,
			password: $password 
		){
			token
			user{
				_id
				username
				email
			}
		}
	}

`
const ADD_USER = gql`
	mutation addUser(
		$username: String!,
		$email: String!,
		$password: String!	
	){
		addUser(
			username: $username,
			email: $email,
			password: $password	
		){
			token
			user {
				_id
				username
			}
		}
	}
`

const SAVE_BOOK = gql`
	mutation SaveBook( $book: BookInput){
		saveBook(book: $book){
			_id
			username
			email
			bookCount
			savedBooks {
				bookId
				title
				authors
				description
				image
				link
			}
		}	
	}
	
`

const REMOVE_BOOK = gql`
	mutation RemoveBook(
		$bookId: BookInput!
	){
		removeBook(
			bookId: $bookId
		){
			_id
			username
			email
			bookCount
			savedBooks{
				bookId
				title
				author
				description
				image
				link
			}	
		}
	}
`

export { LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK }