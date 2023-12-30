import React from "react";
import "./FormBar.css";

function FormBar(props) {
    return (
        <div className="flex column-wrap gap-wrap-8px roboto">
            <span className="roboto-16">{props.header}</span>
            {props.type !== "textarea" ?
                <input className="search-bar form-bar roboto-12" placeholder={props.placeholder} defaultValue={props.value} onChange={(e) => { props.setValue(e.target.value) }} />
                :
                <textarea className="search-bar form-bar roboto-12" placeholder={props.placeholder} defaultValue={props.value} onChange={(e) => { props.setValue(e.target.value) }} />
            }
        </div>
    );
}

export default FormBar;