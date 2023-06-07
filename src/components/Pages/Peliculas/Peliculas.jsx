import React from 'react';
import { useGetMoviesQuery } from '../../../features/movies/moviesApi.js';
import { CardPoster } from '../../Card/Card';

const Peliculas = () => {
  const { data: movies, error, isLoading } = useGetMoviesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredMovies = movies?.filter((entry) => entry.releaseYear >= 2010)
    .sort((a, b) => a.title.localeCompare(b.title));

  // Tomar los primeros 20 resultados
  const firstTwentyResults = filteredMovies.slice(0, 20);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '1rem' }}>
      {firstTwentyResults.map((entry) => (
        <CardPoster
          key={entry.title}
          text={entry.title}
          description={entry.description}
          releaseYear={entry.releaseYear}
          img={entry.images['Poster Art'].url}
        //   height={300}
          link={entry.programType === 'movies' ? 'movies' : 'series'}
        />
      ))}
    </div>
  );
};

export default Peliculas;
