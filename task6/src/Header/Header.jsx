import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header-wrapper flex full-center space-between">
            <Link to={"/"} style={{ textDecoration: "none" }}>
                <h4 className="roboto roboto-24 weight-500 header-main-text black">Админка фильмотеки</h4>
            </Link>
            <Link to={"https://github.com/Tamada4a"} style={{ textDecoration: "none" }} target="_blank" rel="noopener noreferrer" >
                <div className="author-name pointer flex full-center roboto roboto-14 black">Симовин Кирилл 6407</div>
            </Link>
        </header>
    );
}

export default Header;