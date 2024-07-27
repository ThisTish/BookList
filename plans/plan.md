# GraphQL Refactoring Plan

## 1. Set Up GraphQL on the Back-End

### Implement Apollo Server
- [ ] Set up Apollo Server and integrate it with Express in `server.js`.
- [ ] Ensure that GraphQL server is properly initialized and configured.

### Define Schema and Resolvers
- [ ] **Create `typeDefs`** in `typeDefs.js` to define the GraphQL schema.
- [ ] **Implement resolvers** in `resolvers.js` for handling queries and mutations.
- [ ] **Export these** from `index.js` in the `Schemas` directory to integrate with Apollo Server.
<!-- Use the functionality in the user-controller.js as a guide. -->

### Update Auth Middleware
- [ ] Refactor the `auth.js` middleware to work with the GraphQL context.

## Update Front-End Components

###  Set Up Apollo Client
- [ ] Integrate Apollo Client in `App.jsx` by creating an `ApolloProvider` to wrap your application.

### Create and Test Queries and Mutations
- [ ] Define queries and mutations in `queries.js` and `mutations.js`.
- [ ] Ensure these queries and mutations interact correctly with your GraphQL API.

###  Refactor Components to Use GraphQL
- [ ] **`SearchBooks.jsx`**:
  - [ ] Use `useMutation` for `SAVE_BOOK` and handle state management.
- [ ] **`SavedBooks.jsx`**:
  - [ ] Replace `useEffect` with `useQuery` for `GET_ME` and use `useMutation` for `REMOVE_BOOK`.
- [ ] **`SignupForm.jsx`**:
  - [ ] Replace existing functionality with the `ADD_USER` mutation.
- [ ] **`LoginForm.jsx`**:
  - [ ] Replace existing functionality with the `LOGIN_USER` mutation.

## Testing & Validation

###  Test Back-End Functionality
- [ ] Verify that GraphQL queries and mutations work as expected using a tool like GraphQL Playground or Postman.
- [ ] Ensure all resolvers return the correct data and handle errors properly.

###  Test Front-End Integration
- [ ] Test the complete user flow including login, signup, searching for books, saving/removing books, and viewing saved books.
- [ ] Verify that the UI components correctly interact with GraphQL and handle edge cases.

###  Perform End-to-End Testing
- [ ] Ensure that the entire application, from back-end to front-end, works cohesively.
- [ ] Test scenarios like network failures, invalid inputs, and session timeouts.


## Files


### Back-End
- [ ] **`auth.js`**
- [ ] **`server.js`**
- **Schemas Directory**
  - [ ] **`index.js`**
  - [ ] **`typeDefs.js`**
  - [ ] **`resolvers.js`**

### Front-End
- [ ] **`queries.js`**
- [ ] **`mutations.js`**
- [ ] **`App.jsx`**
- [ ] **`SearchBooks.jsx`**
- [ ] **`SavedBooks.jsx`**
- [ ] **`SignupForm.jsx`**
- [ ] **`LoginForm.jsx`**
