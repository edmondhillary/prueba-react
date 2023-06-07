import React, { useState, useEffect } from 'react';
import { useGetMoviesQuery } from '../../../features/movies/moviesApi.js';
import { Spin, Pagination, Select, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CardPoster from '../../Card/Card.jsx';
import MovieModal from '../../Modal/Modal.jsx';
import Header from '../../Header/Header.jsx';
import './Peliculas.scss';

const { Option } = Select;

const Peliculas = () => {
  const { data: movies, error, isLoading } = useGetMoviesQuery();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [filterYear, setFilterYear] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFilteredMovies(
      filterYear
        ? movies.filter((entry) => entry.releaseYear.toString().includes(filterYear))
        : movies
    );
  }, [movies, filterYear]);

  if (isLoading || loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48, color: '#007aff' }} spin />;
    return (
      <div className="spinner-container">
        <Spin indicator={antIcon} size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredMovies.slice(indexOfFirstResult, indexOfLastResult);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleResultsPerPageChange = (value) => {
    setResultsPerPage(value);
    setCurrentPage(1);
  };

  const handleFilterYearChange = (value) => {
    setFilterYear(value);
  };

  return (
    <>
      <Header text="Popular Movies" />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem' }}>
        <Input
          placeholder="Filtrar por año"
          value={filterYear}
          onChange={(e) => handleFilterYearChange(e.target.value)}
          style={{ width: 200, marginBottom: '1rem', borderColor: '#202020' }}
        />
      </div>

      <div className="movies-container">
        {currentResults.map((entry) => (
          <CardPoster
            height={'30%'}
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

      <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem', flexDirection: 'row' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Select value={resultsPerPage} onChange={handleResultsPerPageChange}>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
        </div>

        <Pagination
          current={currentPage}
          total={filteredMovies.length}
          pageSize={resultsPerPage}
          onChange={handlePageChange}
          style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
        />
      </div>
    </>
  );
};

export default Peliculas;
