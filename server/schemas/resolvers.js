const { Query } = require("mongoose")
const { User, Book } = require("../models")
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
	Query: {
		me: async(parent, context) =>{
			const user = context.user

			if(!user) {
				throw AuthenticationError
			}
			return User.findById(user._id).populate('savedBooks')
			
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

		saveBook: async(parent, { book }, context) => {
			const user = context.user

			if(!user) {
				throw AuthenticationError
			}

			try{
				const updatedUser = await User.findOneAndUpdate(
					{ _id: user._id},
					{ $addToSet: { savedBooks: book} },
					{ new: true, runValidators: true}
				)
				return updatedUser

			} catch(error) {
				console.log(error)
				throw new Error(`Couldn't Update: ${error.message}`)
			}
		},

		removeBook: async(parent, { bookId }, context) => {
			const user = context.user

			if(!user) {
				throw AuthenticationError
			}

			try {
				const updatedUser = await User.findOneAndUpdate(
					{_id: user._id},
					{ $pull: {savedBooks: { bookId } } },
					{ new: true, runValidators: true}
				)
				return updatedUser
			} catch (error) {
				console.log(error)
				throw new Error(`Couldn't Update: ${error.message}`)
			}

		}
	}
}



module.exports = resolvers