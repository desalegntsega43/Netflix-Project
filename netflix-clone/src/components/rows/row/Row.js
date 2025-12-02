import React, { useState, useEffect } from 'react';
import axios from '../../../utility/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import '../row/rowcss.css';

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    const base_url = "https://image.tmdb.org/t/p/original";

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log("Trailer error:", error));
        }
    };

    return (
        <div className="row">
            <h1>{truncate(title, 40)}</h1>

            <div className="row__posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterlarge"}`}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                    />
                ))}
            </div>

            <div style={{ padding: "40px" }}>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    );
};

export default Row;
