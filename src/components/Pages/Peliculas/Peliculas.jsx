import React, { useState } from 'react';
import { useGetMoviesQuery } from '../../../features/movies/moviesApi.js';
import CardPoster from '../../Card/Card.jsx';
import MovieModal from '../../Modal/Modal.jsx';
import Header from '../../Header/Header.jsx';

const Peliculas = () => {
  const { data: movies, error, isLoading } = useGetMoviesQuery();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredMovies = movies?.filter((entry) => entry.releaseYear >= 2010).sort((a, b) => a.title.localeCompare(b.title));
  const firstTwentyResults = filteredMovies.slice(0, 20);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
  <>
    <Header text='Popular Movies'/>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '1rem' }}>
      {firstTwentyResults.map((entry) => (
        <CardPoster
          key={entry.title}
          text={entry.title}
          description={entry.description}
          releaseYear={entry.releaseYear}
          img={entry.images['Poster Art'].url}
          link={entry.programType === 'movies' ? 'movies' : 'series'}
          onClick={() => handleMovieClick(entry)}
        />
      ))}
      {selectedMovie && (
        <MovieModal
          title={selectedMovie?.title}
          description={selectedMovie?.description}
          releaseYear={selectedMovie?.releaseYear}
          imageUrl={selectedMovie?.images['Poster Art'].url}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  </>
  );
};

export default Peliculas;
