import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  async function FetchData() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/')
      if (!response.ok) {
        throw new Error("Something went wrong!")
      }
      const data = await response.json();

      const fetchAta = data.results.map(result => {
        return {
          id: result.episode_id,
          title: result.title,
          openingText: result.opening_crawl,
          releaseDate: result.release_date
        };
      });

      setMovies(fetchAta)


    } catch (error) {
      setError(error.message)

    }
    setLoading(false)





  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchData}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={movies} />}
        {!loading && error && <p>{error}</p>}
        {loading && <p>Loading.....</p>}

      </section>
    </React.Fragment>
  );
}

export default App;
