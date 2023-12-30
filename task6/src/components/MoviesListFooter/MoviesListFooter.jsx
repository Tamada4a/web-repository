import React from "react";
import { Link } from "react-router-dom";
import "./MoviesListFooter.css";

function MoviesListFooter(props) {
    return (
        <div className="footer flex row-wrap full-center space-between">
            <span className="roboto roboto-12">{`Найдено фильмов: ${props.length}`}</span>
            <Link to={"/create"} style={{ textDecoration: 'none' }}>
                <button className="add-btn flex row-wrap gap-wrap-8px pointer full-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 0C5.44772 0 5 0.447715 5 1V5H1C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H5V11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11V7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H7V1C7 0.447715 6.55228 0 6 0Z" fill="#333333" />
                    </svg>
                    Добавить
                </button>
            </Link>
        </div>
    );
}

export default MoviesListFooter;