import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

function BookDetails({ bookid }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookid },
    skip: !bookid
  });

  if (!bookid) {
    return (
      <div id="book-details">
        <p>No book selected...</p>
      </div>
    );
  }

  if (loading)
    return (
      <div id="book-details">
        <p>Loading book details...</p>
      </div>
    );
  if (error)
    return (
      <div id="book-details">
        <p>Error: {error.message}</p>
      </div>
    );

  if (!data?.book) {
    return (
      <div id="book-details">
        <p>No details found</p>
      </div>
    );
  }

  const { name, genre, author } = data.book;

  return (
    <div id="book-details">
      <h2>{name}</h2>
      <p>Genre: {genre}</p>
      <p>Author: {author?.name}</p>
      <p>All Books by this author</p>
      <ul className="other-books">
        {author.books.map(item => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default BookDetails;
