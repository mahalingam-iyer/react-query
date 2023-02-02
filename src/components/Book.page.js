import { useParams } from 'react-router-dom'
import { useBookData } from '../hooks/useBookData'

export const BookPage = () => {
  const { bookId } = useParams()
  const { isLoading, data, isError, error } = useBookData(bookId)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <div>
      {data.data.name} - {data.data.alterEgo}
    </div>
  )
}
