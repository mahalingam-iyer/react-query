import { useQuery, useMutation, useQueryClient } from 'react-query'
// import axios from 'axios'
import { request } from '../utils/axios-utils'

const fetchBooks = () => {
  // return axios.get('http://localhost:4000/books')
  return request({ url: '/books' })
}

export const useBooksData = (onSuccess, onError) => {
  return useQuery('books', fetchBooks, {
    onSuccess,
    onError
    // select: data => {
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames
    // }
  })
}

const addBook = hero => {
  // return axios.post('http://localhost:4000/books', hero)
  return request({ url: '/books', method: 'post', data: hero })
}

export const useAddBookData = () => {
  const queryClient = useQueryClient()

  return useMutation(addBook, {
    // onSuccess: data => {
    //   /** Query Invalidation Start */
    //   // queryClient.invalidateQueries('super-heroes')
    //   /** Query Invalidation End */

    //   /** Handling Mutation Response Start */
    // queryClient.setQueryData('super-heroes', oldQueryData => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data]
    //   }
    // })
    //   /** Handling Mutation Response Start */
    // },
    /**Optimistic Update Start */
    onMutate: async newBook => {
      await queryClient.cancelQueries('books')
      const previousHeroData = queryClient.getQueryData('books')
      queryClient.setQueryData('books', oldQueryData => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newBook }
          ]
        }
      })
      return { previousHeroData }
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData('books', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('books')
    }
    /**Optimistic Update End */
  })
}
