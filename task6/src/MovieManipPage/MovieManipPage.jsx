import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./MovieManipPage.css";
import MoviesList from "../MoviesList/MoviesList";
import FormBar from "../components/FormBar/FormBar";
import { NotificationManager } from "react-notifications";


function MovieManipPage(props) {
    const params = useParams();
    const navigate = useNavigate();

    const [startTitle, setStartTitle] = useState("");

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");
    const [src, setSrc] = useState("");
    const [runtime, setRuntime] = useState("");
    const [rating, setRating] = useState("");
    const [actors, setActors] = useState("");
    const [director, setDirector] = useState("");
    const [genres, setGenres] = useState("");


    useEffect(() => {
        if (props.type === "edit") {
            (async () => {
                await fetchMovie();
            })().catch(error => { NotificationManager.error(`Произошла ошибка: ${error}`); });
        } else {
            setStartTitle("");
            setTitle("");
            setYear("");
            setPlot("");
            setSrc("");
            setRuntime("");
            setRating("");
            setActors("");
            setDirector("");
            setGenres("");
        }
    }, [params]);


    async function fetchMovie() {
        try {
            await fetch(`http://localhost:3004/movies/${params.id}`).then((response) => response.json()).then(
                data => {
                    setStartTitle(data.title);
                    setTitle(data.title);
                    setYear(data.year);
                    setPlot(data.plot);
                    setSrc(data.posterUrl);
                    setRuntime(data.runtime);
                    setRating(data.rating === undefined ? "" : data.rating);
                    setActors(data.actors.replaceAll(",", ";"));
                    setDirector(data.director);
                    setGenres(data.genres.join("; "));
                }
            );
        } catch (err) {
            NotificationManager.error(`Произошла ошибка: ${err}`);
        }
    }


    function checkAllInputs() {
        switch ("") {
            case title:
                NotificationManager.error("Введите название фильма");
                break;
            case year:
                NotificationManager.error("Введите год выпуска фильма");
                break;
            case plot:
                NotificationManager.error("Введите описание фильма");
                break;
            case src:
                NotificationManager.error("Укажите ссылку на обложку фильма");
                break;
            case runtime:
                NotificationManager.error("Укажите продолжительность фильма");
                break;
            case rating:
                NotificationManager.error("Укажите рейтинг фильма");
                break;
            case actors:
                NotificationManager.error("Введите актеров фильма");
                break;
            case director:
                NotificationManager.error("Укажите режиссёра фильма");
                break;
            case genres:
                NotificationManager.error("Введите жанры фильма");
                break;
            default:
                saveMovie();
        }
    }


    async function saveMovie() {
        let objectToSave = {
            title: title,
            year: year,
            plot: plot,
            posterUrl: src,
            runtime: runtime,
            rating: rating,
            actors: actors.replaceAll(";", ","),
            director: director,
            genres: genres.split("; ")
        }

        try {
            let fetchUrl;
            let fetchType;

            if (props.type !== "edit") {
                await fetch(`http://localhost:3004/movies`).then((response) => response.json()).then(
                    data => {
                        objectToSave.id = data.length + 1;
                    }
                );

                fetchUrl = `http://localhost:3004/movies`;
                fetchType = "POST";
            } else {
                objectToSave.id = params.id;
                fetchUrl = `http://localhost:3004/movies/${params.id}`;
                fetchType = "PUT";
            }

            await fetch(fetchUrl, {
                method: fetchType,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(objectToSave)
            });

            NotificationManager.success(`Вы успешно ${props.type !== "edit" ? "создали" : "изменили"} фильм "${props.type !== "edit" ? title : startTitle}"`);
            navigate(`/movie/${objectToSave.id}`);
        } catch (err) {
            NotificationManager.error(`Произошла ошибка: ${err}`);
        }
    }


    return (
        <div className="flex row-wrap">
            <MoviesList id={params.id} type={props.type} />
            <div className="main-wrapper flex column-wrap margin-movie-main width-100 space-between">
                <h4 className="roboto roboto-24 weight-500">{props.type === "create" ? "Создание" : "Редактирование"}</h4>
                <div className="manip-container-wrapper width-100">
                    <div className="flex column-wrap gap-wrap-15px">
                        <FormBar header="Название фильма" placeholder="Введите название фильма" type="input" value={title} setValue={setTitle} />
                        <FormBar header="Год выпуска" placeholder="Введите год выпуска фильма" type="input" value={year} setValue={setYear} />
                        <FormBar header="Описание" placeholder="Введите описание фильма" type="textarea" value={plot} setValue={setPlot} />
                        <FormBar header="Обложка" placeholder="Укажите ссылку на обложку фильма" type="input" value={src} setValue={setSrc} />
                        <FormBar header="Продолжительность" placeholder="Укажите продолжительность фильма" type="input" value={runtime} setValue={setRuntime} />
                        <FormBar header="Рейтинг" placeholder="Укажите рейтинг фильма" type="input" value={rating} setValue={setRating} />
                        <FormBar header="Актёры" placeholder="Введите актеров фильма (через ;)" type="input" value={actors} setValue={setActors} />
                        <FormBar header="Режиссёр" placeholder="Укажите режиссёра фильма" value={director} setValue={setDirector} />
                        <FormBar header="Жанры" placeholder="Введите жанры фильма (через ;)" type="input" value={genres} setValue={setGenres} />
                    </div>
                </div>
                <div className="flex row-wrap gap-wrap-20px manip-footer footer align-center">
                    <Link to={params.id ? `/movie/${params.id}` : "/"}>
                        <button className="blue-btn pointer">Отменить</button>
                    </Link>
                    <button className="add-btn flex pointer full-center" onClick={() => { checkAllInputs() }}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div >
    );
}

export default MovieManipPage;