import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchBook = ({ queryKey }) => {
  const bookId = queryKey[1]
  return axios.get(`http://localhost:4000/books/${bookId}`)
}

export const useBookData = bookId => {
  const queryClient = useQueryClient()
  return useQuery(['book', bookId], fetchBook, {
    initialData: () => {
      const book = queryClient
        .getQueryData('book')
        ?.data?.find(book => book.id === parseInt(bookId))
      if (book) {
        return { data: book }
      } else {
        return undefined
      }
    }
  })
}
