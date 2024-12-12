import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ArticleDetail from './components/ArticleDetail'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './assets/article.css'

const App = () => {
  return (
    <Router>
      <Container>
        <header className='py-3 bg-warning '>
          <h1 className='text-center'>Spaceflight News</h1>
        </header>
        <main className='my-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/article/:id' element={<ArticleDetail />} />
          </Routes>
        </main>
        <footer className='py-3 bg-dark text-white text-center'>
          <p>&copy; {new Date().getFullYear()} Spaceflight News</p>
        </footer>
      </Container>
    </Router>
  )
}

export default App
