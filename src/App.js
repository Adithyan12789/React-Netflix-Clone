
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Banner from './components/Banner/Banner';
import RowPost from './components/RowPost/RowPost';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url = {"https://api.themoviedb.org/3/discover/movie?api_key=0ffb386a852dbf070ac6b977313d8039"}  title = "Netflix Originals"/>
      <RowPost url = {"https://api.themoviedb.org/3/movie/upcoming?api_key=0ffb386a852dbf070ac6b977313d8039"}  title = "Upcoming" isSmall/>
      <RowPost url = {"https://api.themoviedb.org/3/movie/top_rated?api_key=0ffb386a852dbf070ac6b977313d8039"}  title = "Popular" isSmall/>
      <RowPost url = {"https://api.themoviedb.org/3/discover/tv?api_key=0ffb386a852dbf070ac6b977313d8039"}  title = "Tv Shows" isSmall/>
    </div>
  );
}

export default App;
