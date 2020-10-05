import React, { Component } from "react";

import StorageNotes from "../../services/StorageNotes";
import { KidBalloon, Rocket, Shuffle } from "../../utils/Icons";
import { deleteStorage, random, getImage } from "../../utils/Helpers";

import Secret from "../../audio/secret2.mp3";
import Board from "../../components/Board";
import Cloud from "../../components/Cloud";

class Games extends Component {
  state = {
    students: [],
    board: true,
    isLoading: false,
    reloadHasError: false,
    saveHasError: false,
  };

  componentDidCatch() {
    this.handleCatch();
  }

  componentDidMount() {
    this.handleReload();
  }

  // Catch Error
  handleCatch = () => {
    this.setState({ reloadHasError: true });
    console.log("catch");
  };

  // Reload Storage Items
  handleReload = () => {
    const storageVar = this.props.data.url;
    StorageNotes.load(storageVar)
      .then((data) => {
        this.setState({ students: data, reloadHasError: false });
      })
      .catch(() => {
        this.setState({ reloadHasError: true });
      });
  };

  // Save Storage
  handleSave = (storageItem) => {
    const storageVar = this.props.data.url;
    StorageNotes.save(storageVar, storageItem)
      .then(() => {
        this.setState({ saveHasError: false });
      })
      .catch(() => {
        this.setState({ saveHasError: true });
      });
  };

  // Delete Storage Item
  handleDelete = (value) => {
    this.setState((prevState) => {
      const newStudents = prevState.students.slice();
      const index = newStudents.findIndex((n) => n === value);
      newStudents.splice(index, 1);
      this.handleSave(newStudents);
      return {
        students: newStudents,
      };
    });
  };

  // Add Storage Item
  handleAddStudent = (value) => {
    this.setState((prevState) => {
      const students = prevState.students.concat([value]);
      this.handleSave(students);
      return { students };
    });
  };

  // Get Array Item to save on Storage
  chooseStudent = () => {
    const { students } = this.state;
    const { names, url } = this.props.data;

    // Randomiza os nomes
    if (students) {
      const arr = names.filter(function (x) {
        return students.indexOf(x) < 0;
      });
      if (arr.length === 0) {
        this.setState({ students: [] });
        deleteStorage(url);
        this.handleAddStudent(random(names));
      } else {
        this.handleAddStudent(random(arr));
      }
    } else {
      this.handleAddStudent(random(names));
    }
  };

  handleStudent = () => {
    // Start Load
    this.setState({ isLoading: true });
    // Play Sound
    const audioEl = new Audio(Secret);
    audioEl.volume = 1;
    audioEl.play();

    // SetTimeOut para dar sensação de espera
    setTimeout(
      function () {
        // Remove o Load
        this.setState({ isLoading: false });
        // Atribui o Aluno ao state
        this.chooseStudent();
      }.bind(this),
      2800
    );
  };

  // Handle Board Status
  handleBoard = () => {
    const { board } = this.state;
    this.setState({ board: !board });
  };

  render() {
    // Props
    const {
      students,
      isLoading,
      board,
      reloadHasError,
      saveHasError,
    } = this.state;
    const { title, url } = this.props.data;

    if (reloadHasError) return <Error onRetry={this.handleReload} />;

    return (
      <section>
        {saveHasError && (
          <span className="saveError">Falha ao salvar no histórico!</span>
        )}
        <div className="turmaInfo">{title}</div>
        <Board
          localStorage={url}
          status={board}
          students={students}
          handleDelete={this.handleDelete}
          handleBoard={this.handleBoard}
        />
        <div className="container">
          <Cloud
            title="Let's Play?"
            isLoading={isLoading}
            students={students}
          />
          <div className="gameImg">
            {isLoading ? (
              <Shuffle />
            ) : (
              <img src={getImage(students.slice(-1)[0])} />
            )}
          </div>
          <button
            className="button"
            onClick={() => !isLoading && this.handleStudent()}
          >
            Escolher
          </button>
          <div className="kidBallon">
            <KidBalloon />
          </div>
          <div className="spaceRocket">
            <Rocket />
          </div>
        </div>
      </section>
    );
  }
}

export default Games;
