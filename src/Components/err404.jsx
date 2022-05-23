import React from "react";
import { Link } from "react-router-dom";
import '../css/error404.css';

function ContentError() { //Error 404 Page
    return (
        <div className='weatherCardContainer'>
            <img src="error404.png" alt="error-png" id="err404Img"></img>
            <h1>Error 404</h1>
            <Link to="/">
                <button id='returnBtn'>Return Home</button>
            </Link>
        </div>
    )
}

export default  ContentError;
