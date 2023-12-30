import React, { useState } from "react";
import "./MovieBar.css";
import Like from "../Like/Like";


function MovieBar(props) {
    const [isFavorite, setIsFavorite] = useState(props.isFavorite);

    return (
        <>
            <div className={`movie-bar flex justify-center start column-wrap roboto gap-wrap-6px pointer ${props.isSelected ? "movie-bar-selected" : ""}`}>
                <div className="flex row-wrap gap-wrap-5px align-center">
                    <span className="roboto-12 black">{props.title}</span>
                    <Like isFavorite={props.setIsFavorite !== undefined ? props.isFavorite : isFavorite} setIsFavorite={props.setIsFavorite !== undefined ? props.setIsFavorite : setIsFavorite} size={14} title={props.title} id={props.id} />
                </div>
                <div className="flex row-wrap gap-wrap-8px">
                    <span className="gray roboto-11">{props.year}</span>
                    <span className="roboto-11">|</span>
                    <span className="gray roboto-11">{props.genres}</span>
                </div>
            </div>
        </>
    );
}

export default MovieBar;