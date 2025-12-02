
import React, { useState, useEffect } from 'react';
import axios from '../../utility/axios.js';
import requests from '../../utility/requests.js';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import '../banner/banner.css';

// Utility function to truncate strings
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

const Banner = () => { // Fixed: Component name to Banner
    const [movie, setMovie] = useState({});
    const [trailerUrl, setTrailerUrl] = useState("");
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                setMovie(
                    request.data.results[
                        Math.floor(Math.random() * request.data.results.length)
                    ]
                );
                setTrailerUrl(""); // Reset trailer when new movie is loaded
            } catch (error) {
                console.log("Error fetching banner movie:", error);
            }
        })();
    }, []);

    const handlePlayClick = () => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log("Trailer error:", error));
        }
    };

    const handleMyListClick = () => {
        // Simulate adding to My List - in a real app, this would update backend/user state
        console.log("Added/Removed from My List:", movie?.title || movie?.name);
        alert(`${movie?.title || movie?.name} added to My List!`); // Simple feedback
    };

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`, // Removed conditional for simplicity, fallback handled by TMDB
                backgroundPosition: "center"
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button banner__button_play" onClick={handlePlayClick}>
                        {trailerUrl ? "Stop" : "Play"}
                    </button>
                    <button className="banner__button banner__button_mylist" onClick={handleMyListClick}>
                        My List
                    </button>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
                {trailerUrl && (
                    <div style={{ padding: "20px 0" }}>
                        <YouTube videoId={trailerUrl} opts={opts} />
                    </div>
                )}
            </div>
            <div className="banner__fadeBottom" />
        </header>
    );
};

export default Banner;