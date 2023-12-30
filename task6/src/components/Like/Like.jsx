import React from "react";
import "./Like.css";
import { NotificationManager } from "react-notifications";

function Like(props) {
    async function changeFavorite() {
        try {
            if (props.isFavorite) {
                await fetch(`http://localhost:3004/favorites/${props.id}`, {
                    method: 'DELETE'
                });

                NotificationManager.info(`Вы удалили из избранного фильм "${props.title}"`);
            }
            else {
                await fetch('http://localhost:3004/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ id: props.id })
                });

                NotificationManager.success(`Вы добавили в избранное фильм "${props.title}"`);
            }
            props.setIsFavorite(!props.isFavorite);
        } catch (err) {
            NotificationManager.error(`Произошла ошибка: ${err}`);
        }
    }


    return (
        <div className="like-bar pointer" onClick={() => { changeFavorite() }}>
            <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 130 130" fill="none">
                <path d="M65 29C59 19 49 12 37 12C20 12 7 25 7 42C7 75 25 80 65 118C105 80 123 75 123 42C123 25 110 12 93 12C81 12 71 19 65 29Z" fill={props.isFavorite ? "red" : "black"} />
            </svg>
        </div>
    );
}

export default Like;