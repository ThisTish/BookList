//*** Acceptance Criteria

const { User } = require("../server/models")


//! GIVEN a book search engine
//! WHEN I load the search engine
//! THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
	// todo set up App.jsx for <Router><Routes><Route>
	// todo Setup Apollo Server
	// todo set up App.jsx with ApolloProvider, ApolloClient, (InMemoryCache)
	// todo deploy to Render

//! WHEN I click on the Search for Books menu option
//! THEN I am presented with an input field to search for books and a submit button
	// todo search form
		// * useState()
		// * onChange
		// * onSubmit

//! WHEN I am not logged in and enter a search term in the input field and click the submit button
//! THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
	// todo queries
		// * useQueries
		// *GET_RESULTS
	// todo set up schema
		// *types
		// *RootQuery
//! WHEN I click on the Login/Signup menu option
//! THEN a modal appears on the screen with a toggle between the option to log in or sign up
	// todo useState() for button onClick

//! WHEN the toggle is set to Signup
//! THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
	// todo pass props
//! WHEN the toggle is set to Login
//! THEN I am presented with two inputs for an email address and a password and login button
	// todo pass props


//! WHEN I enter a valid email address and create a password and click on the signup button
//! THEN my user account is created and I am logged in to the site
	// todo type for user
	// todo mutation for addUser
	// ?login

//! WHEN I enter my account’s email address and password and click on the login button
//! THEN I the modal closes and I am logged in to the site
	// todo query to findUser
	// ?login

//! WHEN I am logged in to the site
//! THEN the menu options change to Search for Books, an option to see my saved books, and Logout
	// todo Auth function
	// todo pass prop

//! WHEN I am logged in and enter a search term in the input field and click the submit button
//! THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
	// todo pass prop

//! WHEN I click on the Save button on a book
//! THEN that book’s information is saved to my account
	// todo mutation to ADD_BOOK

//! WHEN I click on the option to see my saved books
//! THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
	// todo query to GET_USER & GET_BOOKS(?BYUSER)

//! WHEN I click on the Remove button on a book
//! THEN that book is deleted from my saved books list
	// todo mutation to DELETE_BOOK

//! WHEN I click on the Logout button
//! THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  
	// ?logout



// 	### Back-End Specifications


// // `auth.js`: Update the auth middleware function to work with the GraphQL API.

// // `server.js`: Implement the Apollo Server and apply it to the Express server as middleware.

// // `Schemas` directory:
//   // `index.js`: Export your typeDefs and resolvers.

//   // `resolvers.js`: Define the query and mutation functionality to work with the Mongoose models.
//   Hint**: Use the functionality in the `user-controller.js` as a guide.

//   // `typeDefs.js`: Define the necessary `Query` and `Mutation` types:
//     // `Query` type:
//       // `me`: Which returns a `User` type.

//     // `Mutation` type:
//       // `login`: Accepts an email and password as parameters; returns an `Auth` type.
//       // `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.
//       // `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)
//       // `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.

//     // `User` type:
//      //  `_id`
//      //  `username`
//      //  `email`
//      //  `bookCount`
//      //  `savedBooks` (This will be an array of the `Book` type.)

//     // `Book` type:
//        //`bookId` (Not the `_id`, but the book's `id` value returned from Google's Book API.)
//        //`authors` (An array of strings, as there may be more than one author.)
//        //`description`
//        //`title`
//        //``image`
//        //`link`

//     // `Auth` type:
//        //`token`
//        //`user` (References the `User` type.)

// ### Front-End Specifications

// // `queries.js`: This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server.

// // `mutations.js`:
//   // `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.
//   // `ADD_USER` will execute the `addUser` mutation.
//   // `SAVE_BOOK` will execute the `saveBook` mutation.
//   // `REMOVE_BOOK` will execute the `removeBook` mutation.

// Additionally, you’ll need to complete the following tasks in each of these front-end files:

// // `App.jsx`: Create an Apollo Provider to make every request work with the Apollo Server.
// //import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

// ! `SearchBooks.jsx`:
//   TODO Use the Apollo `useMutation()` Hook to execute the `SAVE_BOOK` mutation in the `handleSaveBook()` function instead of the `saveBook()` function imported from the `API` file.
//   TODO Make sure you keep the logic for saving the book's ID to state in the `try...catch` block!

// ! `SavedBooks.jsx`:
//   TODO Remove the `useEffect()` Hook that sets the state for `UserData`.
//   TODO Instead, use the `useQuery()` Hook to execute the `GET_ME` query on load and save it to a variable named `userData`.
//   TODO Use the `useMutation()` Hook to execute the `REMOVE_BOOK` mutation in the `handleDeleteBook()` function instead of the `deleteBook()` function that's imported from `API` file. (Make sure you keep the `removeBookId()` function in place!)

// ! `SignupForm.jsx`: Replace the `addUser()` functionality imported from the `API` file with the `ADD_USER` mutation functionality.

// ! `LoginForm.jsx`: Replace the `loginUser()` functionality imported from the `API` file with the `LOGIN_USER` mutation functionality.


