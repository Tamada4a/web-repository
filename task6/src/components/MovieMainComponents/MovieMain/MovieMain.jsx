import React from "react";
import "./MovieMain.css";
import Like from "../../Like/Like";

function MovieMain(props) {
    function getCorrectRuntime() {
        return `${props.runtime} мин. / ${fixNumber(Math.floor(props.runtime / 60))}:${fixNumber(Math.floor(props.runtime % 60))}`;
    }


    function fixNumber(number) {
        return number < 10 ? `0${number}` : number;
    }


    function getActors() {
        let content = [];
        let size = props.actors.length > 4 ? 4 : props.actors.length;
        for (let i = 0; i < size; ++i) {
            content.push(
                <span className="roboto roboto-16" key={props.actors[i]}>{props.actors[i]}</span>
            );
        }

        if (props.actors.length > 4)
            content.push(
                <span className="roboto roboto-16 last-n-actors pointer">{`Остальные ${props.actors.length - 4} актёра`}</span>
            );
        return content;
    }


    return (
        <div className="flex row-wrap gap-wrap-15px movie-main-wrapper">
            <img className="img-wrapper" src={props.posterUrl} alt={props.title} />
            <div className="padding-right-15px width-100 flex column-wrap gap-wrap-20px">
                <div className="flex column-wrap gap-wrap-5px">
                    <div className="flex row-wrap gap-wrap-10px">
                        <h4 className="roboto roboto-24 weight-500">{props.title}</h4>
                        <Like isFavorite={props.isFavorite} setIsFavorite={props.setIsFavorite} size={29} title={props.title} id={props.id} />
                    </div>
                    <span className="roboto roboto-16 gray">{props.director}</span>
                </div>
                <div className="width-100 flex space-between">
                    <div className="flex column-wrap gap-wrap-10px">
                        <span className="roboto roboto-16 weight-500">Параметры</span>
                        <div className="flex column-wrap gap-wrap-5px">
                            <div>
                                <span className="roboto roboto-16 gray">Год производства: </span>
                                <span className="roboto roboto-16">{props.year}</span>
                            </div>
                            <div>
                                <span className="roboto roboto-16 gray">Продолжительность: </span>
                                <span className="roboto roboto-16">{getCorrectRuntime()}</span>
                            </div>
                            <div>
                                <span className="roboto roboto-16 gray">Жанры: </span>
                                <span className="roboto roboto-16">{props.genres}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex column-wrap gap-wrap-15px">
                        <div className="flex row-wrap gap-wrap-8px align-center">
                            <span className="roboto roboto-16 weight-500">В главных ролях</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="15" viewBox="0 0 7 15" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.5256 14.2071C1.1766 14.5976 0.610753 14.5976 0.261751 14.2071C-0.0872504 13.8166 -0.0872504 13.1834 0.261751 12.7929L4.99188 7.5L0.261751 2.20711C-0.0872504 1.81658 -0.0872504 1.18342 0.261751 0.792893C0.610753 0.402369 1.1766 0.402369 1.5256 0.792893L6.25572 6.08579C6.95373 6.86684 6.95373 8.13316 6.25572 8.91421L1.5256 14.2071Z" fill="#333333" />
                            </svg>
                        </div>
                        <div className="flex column-wrap gap-wrap-10px">
                            {getActors()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieMain;