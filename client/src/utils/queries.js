import { gql } from '@apollo/client'

const GET_ME = gql `
	query Me {
		me(username) {
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
modules.export =  GET_ME