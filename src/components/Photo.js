import React from "react";

const Photo = props => (
    <li>
        <img src={ props.src } alt={ props.desc } />
    </li>
);

export default Photo;