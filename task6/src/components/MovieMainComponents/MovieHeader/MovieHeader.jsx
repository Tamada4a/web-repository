import React from "react";
import "./MovieHeader.css";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";

function MovieHeader(props) {
    return (
        <>
            <div className="movie-header flex row-wrap space-between">
                <div className="flex row-wrap gap-wrap-15px full-center">
                    <span className="roboto roboto-14">{`id: ${props.id}`}</span>
                    <div className="pointer copy" title="Скопировать ID" onClick={() => { navigator.clipboard.writeText(props.id); NotificationManager.info('ID фильма скопирован'); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9 2H2V10C2 10.552 1.55228 11 1 11C0.447715 11 0 10.552 0 10V2C0 0.895581 0.895052 0 2 0H9C9.55229 0 10 0.447962 10 1C10 1.55314 9.55229 2.0011 9 2ZM5 5H12V12H5V5ZM5 14H12C13.1049 14 14 13.1044 14 12V5C14 3.89558 13.1049 3 12 3H5C3.89505 3 3 3.89558 3 5V12C3 13.1044 3.89505 14 5 14Z" fill="#333333" />
                        </svg>
                    </div>
                </div>
                <Link to={`/edit/${props.id}`} style={{ textDecoration: 'none' }}>
                    <div className="pointer edit flex row-wrap gap-wrap-8px full-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5 13.5858V9.17157L13.5858 0.585786C14.3668 -0.195262 15.6332 -0.195262 16.4142 0.585786L18 2.17157C18.781 2.95262 18.781 4.21895 18 5L9.41421 13.5858H5ZM14 15.5858V12.5858L16 10.5858V12.5858V15.5858C16 17.2426 14.6569 18.5858 13 18.5858H3C1.34315 18.5858 0 17.2426 0 15.5858V5.58579C0 3.92893 1.34315 2.58579 3 2.58579H6H8L6 4.58579H3C2.44772 4.58579 2 5.0335 2 5.58579V15.5858C2 16.1381 2.44772 16.5858 3 16.5858H13C13.5523 16.5858 14 16.1381 14 15.5858ZM15 2L16.5858 3.58579L8.58579 11.5858H7V10L15 2Z" fill="#333333" />
                        </svg>
                        <span className="roboto roboto-16 black">Редактировать</span>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default MovieHeader;