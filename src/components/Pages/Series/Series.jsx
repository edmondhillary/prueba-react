import React from 'react';
import { useGetSeriesQuery } from '../../../features/series/seriesApi.js';
import { CardPoster } from '../../Card/Card';

const Series = () => {
  const { data: series, error, isLoading } = useGetSeriesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredSeries = series?.filter((entry) => entry.releaseYear >= 2010)
    .sort((a, b) => a.title.localeCompare(b.title));

  // Tomar los primeros 20 resultados
  const firstTwentyResults = filteredSeries.slice(0, 20);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '1rem' }}>
      {firstTwentyResults.map((entry) => (
        <CardPoster
          key={entry.title}
          text={entry.title}
          description={entry.description}
          releaseYear={entry.releaseYear}
          img={entry.images['Poster Art'].url || "https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2079504220.jpg"}
        //   height={300}
          link={entry.programType === 'movies' ? 'movies' : 'series'}
        />
      ))}
    </div>
  );
};

export default Series;
