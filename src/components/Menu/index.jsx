import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";

const Menu = ({ classes, games, memory, history }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <Fragment>
      <button
        className={[
          "navButton",
          "menuButton",
          isMenuOpen && "menuButton--open",
        ].join(" ")}
        onClick={() => handleMenu()}
      >
        <div
          className={[
            "menuButton__holder",
            isMenuOpen && "menuButton__holder--open",
          ].join(" ")}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <div className={["sideMenu", isMenuOpen && "sideMenu--open"].join(" ")}>
        <div
          className={[
            "sideMenu__menu",
            isMenuOpen && "sideMenu__menu--show",
          ].join(" ")}
        >
          <ul className="">
            <h3>Turmas</h3>
            {classes.map(({ title, url }) => {
              return (
                <li
                  key={`menu_${url}`}
                  onClick={() => {
                    handleMenu();
                    history.push(url);
                  }}
                >
                  {title}
                </li>
              );
            })}
            <h3>Jogos</h3>
            {games.map(({ title, url }) => {
              return (
                <li
                  key={`menu_${url}`}
                  onClick={() => {
                    handleMenu();
                    history.push(url);
                  }}
                >
                  {title}
                </li>
              );
            })}
            <h3>Memory Game</h3>
            {memory.games.map(({ title, url }) => {
              return (
                <li
                  key={`menu_${url}`}
                  onClick={() => {
                    handleMenu();
                    history.push(`/memory-game/${url}`);
                  }}
                >
                  {title}
                </li>
              );
            })}
            <h3>Infos</h3>

            <li
              onClick={() => {
                handleMenu();
                history.push("/");
              }}
            >
              Início
            </li>
            <li
              onClick={() => {
                handleMenu();
                history.push("/sobre");
              }}
            >
              Sobre
            </li>
          </ul>
        </div>
        <div className="sideMenu__close" onClick={() => handleMenu()}></div>
      </div>
    </Fragment>
  );
};

export default withRouter(Menu);
