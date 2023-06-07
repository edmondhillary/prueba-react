import React, { useState } from "react";
import { useGetSeriesQuery } from "../../../features/series/seriesApi.js";
import CardPoster from "../../Card/Card.jsx";
import MovieModal from "../../Modal/Modal.jsx";
import Header from "../../Header/Header.jsx";

const Series = () => {
  const { data: series, error, isLoading } = useGetSeriesQuery();
  const [selectedSeries, setSelectedSeries] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredSeries = series
    ?.filter((entry) => entry.releaseYear >= 2010)
    .sort((a, b) => a.title.localeCompare(b.title));
  const firstTwentyResults = filteredSeries.slice(0, 20);

  const handleSeriesClick = (series) => {
    setSelectedSeries(series);
  };

  return (
    <>
    <Header text='Popular Series'/>
    
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "1rem",
      }}
    >
      {firstTwentyResults.map((entry) => (
        <CardPoster
          key={entry.title}
          text={entry.title}
          description={entry.description}
          releaseYear={entry.releaseYear}
          img={entry.images["Poster Art"].url}
          link={entry.programType === "movies" ? "movies" : "series"}
          onClick={() => handleSeriesClick(entry)}
        />
      ))}
      {selectedSeries && (
        <MovieModal
          title={selectedSeries?.title}
          description={selectedSeries?.description}
          releaseYear={selectedSeries?.releaseYear}
          imageUrl={selectedSeries?.images["Poster Art"].url}
          onClose={() => setSelectedSeries(null)}
        />
      )}
    </div>
    </>
  );
};

export default Series;
