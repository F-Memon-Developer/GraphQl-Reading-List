import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const [addBook] = useMutation(addBookMutation);

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  if (loading) return <option disabled>Loading Authors...</option>;
  if (error) return <p>Error fetching authors</p>;

  const handleSubmit = async e => {
    e.preventDefault();

    addBook({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });

    setName('');
    setGenre('');
    setAuthorId('');
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select value={authorId} onChange={e => setAuthorId(e.target.value)}>
          <option value="">Select author</option>
          {data.authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">+</button>
    </form>
  );
}

export default AddBook;
