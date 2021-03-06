import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Listas
import ClassInfo from "../../utils/Data/turmas.json";
import GameList from "../../utils/Data/games.json";
import MemoryData from "../../utils/Data/memory-game.json";

// Components
import Home from "../Home";
import Classes from "../Class";
import Games from "../Games";
import MemoryCard from "../MemoryCard";
import About from "../Sobre";
import Menu from "../../components/Menu";
import Audio from "../../components/Music";

class App extends Component {
  state = {
    isLoading: true,
    audioSong: "",
    saveHasError: false,
  };

  componentDidMount() {
    const { song, song2, location } = this.props;
    const newAudio = location.pathname === "/dance-and-freeze" ? song2 : song;
    this.setState({ audioSong: newAudio });
    setTimeout(() => this.setState({ isLoading: false }), 3500);
  }

  render() {
    const { isLoading, audioSong } = this.state;
    return (
      <Router>
        <div
          className={["loadPage", isLoading && "loadPage--loading"].join(" ")}
        >
          <figure>
            <img src={require("../../images/load-home.gif")} />
          </figure>
        </div>
        <Audio song={audioSong} />
        <Menu classes={ClassInfo} games={GameList} memory={MemoryData} />
        <Fragment>
          <Route path="/" exact component={Home} />
          {ClassInfo.map((item) => {
            return (
              <Route
                key={item.url}
                path={`/${item.url}`}
                exact
                render={(props) => <Classes data={item} />}
              />
            );
          })}

          {GameList.map((item) => {
            return (
              <Route
                key={item.url}
                path={`/${item.url}`}
                exact
                render={(props) => <Games data={item} />}
              />
            );
          })}
          {MemoryData.games.map((item) => {
            return (
              <Route
                key={item.url}
                path={`/memory-game/${item.url}`}
                exact
                render={(props) => <MemoryCard data={item} />}
              />
            );
          })}
          <Route path="/sobre" exact component={About} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
