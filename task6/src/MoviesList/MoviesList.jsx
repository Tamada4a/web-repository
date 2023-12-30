import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MoviesList.css";
import MovieBar from "../components/MovieBar/MovieBar";
import MoviesListFooter from "../components/MoviesListFooter/MoviesListFooter";
import { NotificationManager } from "react-notifications";

function MoviesList(props) {
    const [allMovies, setAllMovies] = useState(null);
    const [moviesToShow, setMoviesToShow] = useState(null);

    const [subStringToFind, setSubStringToFind] = useState("");


    useEffect(() => {
        (async () => {
            await fetchMovies();
        })().catch(error => { NotificationManager.error(`Произошла ошибка: ${error}`); });
    }, []);


    async function fetchMovies() {
        const fetchedMovies = await fetch(`http://localhost:3004/movies`).then((response) => response.json());
        const favoritesMovies = await fetch(`http://localhost:3004/favorites`).then((response) => response.json());
        for (let movie of fetchedMovies) {
            movie.isFavorite = favoritesMovies.some(e => e.id === movie.id);
        }
        setAllMovies(fetchedMovies);
        setMoviesToShow(fetchedMovies);
    }


    function searchMovies() {
        if (subStringToFind === "")
            setMoviesToShow(allMovies);
        else {
            setMoviesToShow(allMovies.filter(x => x.title.includes(subStringToFind)));
        }
    }


    return (
        <div className="side-bar flex column-wrap space-between margin-left">
            <div className="flex column-wrap gap-wrap-15px">
                <div className="flex row-wrap gap-wrap-15px">
                    <input className="search-bar roboto roboto-12" placeholder="Введите название фильма" onChange={(e) => setSubStringToFind(e.target.value)} />
                    <button className="blue-btn search-btn pointer" onClick={(e) => { searchMovies() }}>Искать</button>
                </div>
                <div className="movie-list">
                    <div className="flex column-wrap gap-wrap-6px">
                        {moviesToShow && moviesToShow.map((movie) =>
                            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }} key={movie.id}>
                                <MovieBar title={movie.title} isFavorite={Number(movie.id) === Number(props.id) ? props.isFavorite : movie.isFavorite} setIsFavorite={props.setIsFavorite} id={movie.id} year={movie.year} genres={movie.genres.join(", ")} isSelected={Number(movie.id) === Number(props.id)} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {moviesToShow && props.type === undefined && <MoviesListFooter length={moviesToShow.length} />}
        </div>
    );
}

export default MoviesList;