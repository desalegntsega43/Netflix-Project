import React, { useState, useEffect } from 'react';
import axios from '../../utility/axios.js';
import requests from '../../utility/requests.js';
import '../banner/banner.css'

const Bannerr = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("Error fetching banner movie:", error);
      }
    })();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`
          : "none",
        backgroundPosition: "center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button banner__button_play">Play</button>
          <button className="banner__button banner__button_mylist">My List</button>
        </div>

        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner__fadeBottom" />
    </header>
  );
};
export default Bannerr;
