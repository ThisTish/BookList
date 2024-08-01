import { gql } from '@apollo/client'

const GET_ME = gql`
	query Me {
		me {
			_id
			username
			savedBooks{
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
export { GET_ME }