import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MoviePage.css";
import MoviesList from "../MoviesList/MoviesList";
import MovieHeader from "../components/MovieMainComponents/MovieHeader/MovieHeader";
import MovieMain from "../components/MovieMainComponents/MovieMain/MovieMain";
import MovieDescription from "../components/MovieMainComponents/MovieDescription/MovieDescription";
import { NotificationManager } from "react-notifications";


function MoviePage() {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        (async () => {
            await fetchMovie();
        })().catch(error => { NotificationManager.error(`Произошла ошибка: ${error}`); });
    }, [params]);


    async function fetchMovie() {
        try {
            const fetchedMovie = await fetch(`http://localhost:3004/movies/${params.id}`).then((response) => response.json());
            const favoritesMovies = await fetch(`http://localhost:3004/favorites/${params.id}`).then((response) => response.json());
            if (Array.isArray(fetchedMovie))
                fetchedMovie.isFavorite = favoritesMovies.some(e => e.id === fetchedMovie.id);
            else
                fetchedMovie.isFavorite = favoritesMovies.id === fetchedMovie.id;

            setIsFavorite(fetchedMovie.isFavorite);
            setMovie(fetchedMovie);
        } catch (err) {
            NotificationManager.error(`Произошла ошибка: ${err}`);
        }
    }

    return (
        <div className="flex row-wrap">
            <MoviesList id={params.id} isFavorite={isFavorite} setIsFavorite={setIsFavorite} />
            {movie && <div className="main-wrapper padding-right-15px flex column-wrap margin-movie-main">
                <MovieHeader id={movie.id} />
                <MovieMain isFavorite={isFavorite} setIsFavorite={setIsFavorite} title={movie.title} id={movie.id} director={movie.director} year={movie.year} posterUrl={movie.posterUrl} runtime={movie.runtime} genres={movie.genres.join(", ")} actors={movie.actors.split(", ")} />
                <MovieDescription plot={movie.plot} rating={movie.rating} />
            </div>}
        </div>
    );
}

export default MoviePage;