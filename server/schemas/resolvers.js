const { Query } = require("mongoose")
const { User, Book } = require("../models")
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
	Query: {
		me: async(parent, { username }) =>{
			const foundUser = await User.findOne({ username }).populate('savedBooks')
			if(!foundUser) {
				throw new Error('Cannot Find User')
			}
			return foundUser
		}
	},

	Mutation: {
		addUser: async(parent, { username, email, password }) =>{
			const user = await User.create({ username, email, password })
			const token = signToken(user)
			return { token, user }
		},

		login: async (parent, { username, email, password }) =>{
			const user = await User.findOne({
				$or: [{username}, {email}]
			})

			if(!user) {
				throw AuthenticationError
			}

			const correctPw = await user.isCorrectPassword(password)

			if(!correctPw) {
				throw AuthenticationError
			}

			const token = signToken(user)

			return { token,	user }
		},

		saveBook: async(parent, { user, book }) => {
			
			try{
				const updatedUser = await User.findOneAndUpdate(
					{ _id: user._id},
					{ $addToSet: { savedBooks: book} },
					{ new: true, runValidators: true}
				)
				
				if(!updatedUser){
					throw AuthenticationError
				}

				return updatedUser

			} catch(error) {
				console.log(error)
				throw new Error(`Couldn't Update: ${error.message}`)
			}
		},

		removeBook: async(parent, { user, bookId }) => {

			try {
				const updatedUser = await User.findOneAndUpdate(
					{_id: user._id},
					{ $pull: {savedBooks: { bookId } } },
					{ new: true, runValidators: true}
				)
				if(!updatedUser){
					throw AuthenticationError
				}
				return updatedUser
			} catch (error) {
				console.log(error)
				throw new Error(`Couldn't Update: ${error.message}`)
			}

		}
	}
}



module.exports = resolvers