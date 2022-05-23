//header to be displayed at all times
import React from "react";
import "../css/header.css"
function Header () {
    return (
        
    <header className="App-header">
        <img id="main-logo" src="mainlogo.png" alt="main-logo"></img>
        <h1 class="headingOne"><span class='testA'>Simple Weather</span> <span class='testB'>App</span> </h1>
    </header>)
}

export default Header;
