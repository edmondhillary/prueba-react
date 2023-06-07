import React, { useState, useEffect } from "react";
import { useGetSeriesQuery } from "../../../features/series/seriesApi.js";
import { Spin, Pagination, Select, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CardPoster from "../../Card/Card.jsx";
import MovieModal from "../../Modal/Modal.jsx";
import Header from "../../Header/Header.jsx";
import "./Series.scss";

const { Option } = Select;
const years = [];
for (let year = 1930; year <= 2023; year++) {
  years.push(year);
}

const Series = () => {
  const { data: series, error, isLoading } = useGetSeriesQuery();
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSeries, setFilteredSeries] = useState(null);
  const [filterYear, setFilterYear] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFilteredSeries(
      filterYear
        ? series.filter((entry) =>
            entry.releaseYear.toString().includes(filterYear)
          )
        : series
    );
  }, [series, filterYear]);

  if (isLoading || loading) {
    const antIcon = (
      <LoadingOutlined style={{ fontSize: 48, color: "#007AFF" }} spin />
    );
    return (
      <div className='spinner-container'>
        <Spin indicator={antIcon} size='large' />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredSeries.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const handleSeriesClick = (series) => {
    setSelectedSeries(series);
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
      <Header text='Popular Series' />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <Input
          placeholder='Filtrar por año'
          value={filterYear}
          onChange={(e) => handleFilterYearChange(e.target.value)}
          style={{
            width: 200,
            marginBottom: "1rem",
            borderColor: "2px solid #202020",
          }}
        />
      </div>

      <div className='series-container'>
        {currentResults?.map((entry) => (
          <CardPoster
            height={"30%"}
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Select
            className='custom-select'
            value={resultsPerPage}
            onChange={handleResultsPerPageChange}
          >
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
          </Select>
        </div>

        <Pagination
          current={currentPage}
          total={filteredSeries.length}
          pageSize={resultsPerPage}
          onChange={handlePageChange}
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </div>
    </>
  );
};

export default Series;
