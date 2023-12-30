import React from "react";
import "./MovieDescription.css";

function MovieDescription(props) {
    function getRatingColor() {
        if (props.rating < 5.0)
            return "red";
        if (props.rating > 8.0)
            return "green";
        return "gray";
    }

    return (
        <div className="flex column-wrap gap-wrap-10px roboto">
            <span className="roboto-20 weight-500 title-margin-bottom">Описание</span>
            <span className="roboto-16">{props.plot}</span>
            <div className="flex row-wrap gap-wrap-50px align-center">
                <span className="roboto-16 weight-500">Текущий рейтинг</span>
                <span className={`roboto-32 ${getRatingColor()}`}>{props.rating === undefined ? "-" : props.rating}</span>
            </div>
        </div>
    );
}

export default MovieDescription;