import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MovieProvider from './context/MovieContext';
import Header from './layout/header/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import FavoriteMoviesPage from './pages/FavoriteMoviesPage';
import DetailMoviePage from './pages/DetailMoviePage';
import NotFountPage from './pages/NotFountPage';
import Footer from './layout/Footer';
import { PRIMARY_NAV_ITEMS } from './constants/header';

function App() {
  return (
    <Router>
      <div className='bg-black min-h-screen flex flex-col'>
        <Header NavItems={PRIMARY_NAV_ITEMS} />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/favorite' element={<FavoriteMoviesPage />} />
            <Route path='movie/:id' element={<DetailMoviePage />} />
            <Route path='*' element={<NotFountPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
