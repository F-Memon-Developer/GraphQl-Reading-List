import React, { Component } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

//components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Memon's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
