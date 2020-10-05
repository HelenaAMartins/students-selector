import React from "react"
import ReactDom from "react-dom"

import App from "./src/containers/App"
import Chicken from "./src/audio/silly_chicken.mp3";
import Smile from "./src/audio/the_biggest_smile.mp3";
import MoveIt from "./src/audio/i-like-to-move-it.mp3";
import "./src/css/index.scss"

ReactDom.render(
    <App song={Chicken} song2={MoveIt} location={location} />,
    document.getElementById("root")
)