import { useState } from 'react'
import {
  useAddBookData,
  useBooksData
} from '../hooks/useBooksData'
import { Link } from 'react-router-dom'

export const BooksPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = data => {
    console.log({ data })
  }

  const onError = error => {
    console.log({ error })
  }

  const { isLoading, data, isError, error, refetch } = useBooksData(
    onSuccess,
    onError
  )

  const { mutate: addBook } = useAddBookData()

  const handleAddBookClick = () => {
    const book = { name, alterEgo }
    addBook(book)
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>React Query Books Page</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddBookClick}>Add Book</button>
      </div>
      <button onClick={refetch}>Fetch Books</button>
      {data?.data.map(book => {
        return (
          <div key={book.id}>
            <Link to={`/books/${book.id}`}>
              {book.id} {book.name}
            </Link>
          </div>
        )
      })}
    </>
  )
}
