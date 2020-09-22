import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Listas
import ClassInfo from "../../utils/Data/turmas.json";

// Components
import Home from "../Home";
import Class from "../Class";
import About from "../Sobre";
import Menu from "../../components/Menu";
import Audio from "../../components/Music";

class App extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 3500);
  }

  render() {
    const { isLoading } = this.state;
    const { song } = this.props;
    return (
      <Router>
        <div className={["loadPage", isLoading && "loadPage--loading"].join(' ')}>
          <img src={require('../../images/load-home.gif')} />
        </div>
        {isLoading && <div className="loadPage">LOAD</div>}
        <Audio song={song} />
        <Menu classes={ClassInfo} />
        <Fragment>
          <Route path="/" exact component={Home} />
          {ClassInfo.map((item) => {
            return (
              <Route
                key={item.url}
                path={`/${item.url}`}
                exact
                render={(props) => <Class data={item} />}
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
