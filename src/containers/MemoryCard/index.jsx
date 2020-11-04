import React, { Component, Fragment } from "react";

import StorageNotes from "../../services/StorageNotes";
import imgPath from "../../images/memory/*/*.jpg";
import { TextBallon, Trash } from "../../utils/Icons";

import TrashSound from "../../audio/trash.mp3";
import Secret from "../../audio/secret2.mp3";
import CardFlip from "../../audio/card-flip.mp3";

import "./cards.scss";

class MemoryCard extends Component {
  state = {
    cards: [],
    hasFlippedCard: false,
    lockBoard: false,
    firstCard: "",
    secondCard: "",
    errors: 0,
    matchs: 0,
    gameEnd: false,
    records: [],
    reloadHasError: false,
    saveHasError: false,
  };

  componentDidMount() {
    this.shuffle();
    this.handleReload();
  }

  componentDidCatch() {
    this.handleCatch();
  }

  // Catch Error
  handleCatch = () => {
    this.setState({ reloadHasError: true });
  };

  // Reload Storage Items
  handleReload = () => {
    const storageVar = `memory_${this.props.data.title}`;
    StorageNotes.load(storageVar)
      .then((data) => {
        this.setState({
          records: data,
          reloadHasError: false,
        });
      })
      .catch(() => {
        this.setState({ reloadHasError: true });
      });
  };

  // Save Storage
  handleSave = (storageItem) => {
    const storageVar = `memory_${this.props.data.title}`;
    StorageNotes.save(storageVar, storageItem)
      .then(() => {
        this.setState({ saveHasError: false });
      })
      .catch(() => {
        this.setState({ saveHasError: true });
      });
  };

  //handleDelete
  handleDelete = () => {
    this.setState({ records: [], gameEnd: false });
    this.handleSave([]);
  };

  flipCard = (e) => {
    const { hasFlippedCard, lockBoard, firstCard } = this.state;

    if (lockBoard) return;
    if (e === firstCard) return;
    if (e.classList.contains("destativar")) return;

    e.classList.add("flip");
    this.playSound(CardFlip, 0.1);

    if (hasFlippedCard) {
      this.setState({ secondCard: e });
      this.checkForMatch(e);
      return;
    }

    this.setState({ hasFlippedCard: true, firstCard: e });
  };

  checkForMatch = (e) => {
    const { firstCard } = this.state;
    let isMatch = firstCard.dataset.framework === e.dataset.framework;
    isMatch ? this.disableCards(e) : this.unflipCards(e);
  };

  disableCards = (e) => {
    const { cards, firstCard, matchs, errors } = this.state;
    this.playSound(Secret, 0.2);
    this.setState({ matchs: matchs + 1 });

    console.log(cards);

    if (matchs === cards.length / 2 - 1) {
      this.setState({ gameEnd: true });

      // Add Storage Item
      this.setState((prevState) => {
        const records = prevState.records.concat([errors]);
        this.handleSave(records);
        return { records };
      });
    }

    firstCard.classList.add("desativar");
    e.classList.add("desativar");

    this.resetBoard();
  };

  unflipCards = (e) => {
    const { firstCard, errors } = this.state;

    this.playSound(CardFlip, 0.1);
    this.setState({ lockBoard: true, errors: errors + 1 });

    setTimeout(() => {
      firstCard.classList.remove("flip");
      e.classList.remove("flip");
      this.playSound(CardFlip, 0.1);
      this.resetBoard();
    }, 1500);
  };

  resetBoard = () => {
    this.setState({
      hasFlippedCard: false,
      lockBoard: false,
      firstCard: "",
      secondCard: "",
    });
  };

  shuffle = () => {
    console.log(this.props);
    const list = this.props.data.list;
    const copy = list.slice(0);
    let cardList = copy.concat(list.slice(0)).sort(() => 0.5 - Math.random());
    this.setState({ cards: cardList });
  };

  playSound = (audio, vol) => {
    const audioEl = new Audio(audio);
    audioEl.volume = vol;
    audioEl.play();
  };

  handleTrash = () => {
    this.playSound(TrashSound, 0.2);
    window.localStorage.removeItem("memory");
    this.setState({ records: [] });
    this.restartGame();
  };

  checkRecords = () => {
    const { records } = this.state;
    const lastGame = records.slice(-1)[0];
    const prevGames = records.slice(0, -1);
    const bestRecord = Math.min.apply(null, prevGames);
    const isNewRecord = lastGame < bestRecord;

    if (records.length === 1) {
      return `New Record: ${lastGame}`;
    }

    const display = isNewRecord
      ? `New Record: ${lastGame}`
      : `Result: ${lastGame} / Record: ${bestRecord}`;
    return display;
  };

  restartGame = () => {
    const divs = document.getElementsByClassName("memory-card");

    for (let i = 0; i < divs.length; i++) {
      divs[i].classList.remove("flip");
      divs[i].classList.remove("desativar");
    }

    this.playSound(CardFlip, 0.5);
    this.resetBoard();
    this.shuffle();
    this.setState({ errors: 0, matchs: 0, gameEnd: false });
  };

  render() {
    const { saveHasError, cards, records, gameEnd } = this.state;
    const { url } = this.props.data;
    console.log(imgPath);
    return (
      <Fragment>
        {saveHasError && (
          <span className="saveError">Falha ao salvar Recordes!</span>
        )}
        {records && records.length > 0 && (
          <span className="navButton deleteButton" onClick={this.handleTrash}>
            <Trash />
          </span>
        )}
        <div className={`gameEnd ${gameEnd && "show"}`}>
          <div>
            <span>
              <b>Congratulations!</b>
              <br />
              {this.checkRecords()}
            </span>
            <TextBallon />
          </div>
          <button className="button" onClick={this.restartGame}>
            Play Again!
          </button>
        </div>

        <section className="sectionMemoryCard">
          <div className="">
            <div className="memory-game">
              {cards.map((item, i) => {
                return (
                  <div
                    key={i}
                    id={`${item}-${i}`}
                    className="memory-card"
                    data-framework={item}
                    onClick={(e) => this.flipCard(e.target)}
                  >
                    <span>{i + 1}</span>
                    <img
                      className="front-face"
                      alt={item}
                      src={
                        imgPath[url][
                          item
                            .split(" ")
                            .join("")
                            .replace(".", "")
                            .toLowerCase()
                        ]
                      }
                    />
                    <img
                      className="back-face"
                      src={imgPath["#"]["question-mark"]}
                      alt="Question Mark"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default MemoryCard;
