import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { BooksPage } from './components/Books.page'
import { BookPage } from './components/Book.page'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
            <li>
                <Link to='/'>Home Page</Link>
              </li>
              <li>
                <Link to='/books'>My Books</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/books/:bookId'>
              <BookPage />
            </Route>
            <Route path='/books'>
              <BooksPage />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
