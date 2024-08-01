const { Query } = require("mongoose")
const { User, Book } = require("../models")
const { signToken, AuthenticationError } = require('../utils/auth')
const { json } = require("express")

const resolvers = {
	Query: {
		me: async(parent, args, context) =>{
			if(!context.user){
				throw new Error('Context.user not found')
			}
			const foundUser = await User.findById(context.user._id).populate('savedBooks')

			if (!foundUser) {
				throw new Error('error in finding by id')
			}
			console.log(`found user ${JSON.stringify(foundUser)}`)
			return foundUser
		},

		all: async() =>{
			const users = User.find().populate('savedBooks')
			return users
		}
	},

	Mutation: {
		addUser: async(parent, { username, email, password }) =>{

			try {
				const user = await User.create({ username, email, password })
				const token = signToken(user)
				return { token, user }
			} catch (error) {
				console.log('error in addUser', error.message)
				console.log('error in addUser', error.stack)
				throw new Error(error.message)
			}
		},

		login: async (parent, { email, password }) =>{
			const user = await User.findOne({email})
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
			if(context){
				try{
					const updatedUser = await User.findOneAndUpdate(
						{ _id: context.user._id},
						{ $addToSet: { savedBooks: book} },
						{ new: true}
					)
					
					if(!updatedUser){
						throw AuthenticationError
					}
					console.log(updatedUser)
					return updatedUser

				} catch(error) {
					console.log(error)
					throw new Error(`Couldn't Update: ${error.message}`)
				}
			}
			else{
				console.log(`no user found`)
			}
		},

		removeBook: async(parent, { bookId }, context) => {
			if(context.user){
				try {
					const updatedUser = await User.findOneAndUpdate(
						{_id: context.user._id},
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
}



module.exports = resolvers