import React, { useState, useEffect } from "react";
import Secret from "../../audio/secret.mp3";

import { Arrow, BoxStudents, TextBallon, Trash } from "../../utils/Icons";
import { saveStorage, deleteStorage, random } from "../../utils/Helpers";

const Class = ({ data }) => {
  // Props
  const { title, url, names } = data;
  const storageVar = url;

  // Class State
  const localStr = JSON.parse(localStorage.getItem(storageVar));
  const [board, showBoard] = useState(true);
  const [isLoading, setLoad] = useState(false);
  const [student, setStudent] = useState();

  const chooseStudent = () => {
    // Randomiza os nomes
    if (localStr) {
      const arr = names.filter(function (x) {
        return localStr.indexOf(x) < 0;
      });
      if (arr.length === 0) {
        deleteStorage(storageVar);
        setStudent(random(names));
      } else {
        setStudent(random(arr));
      }
    } else {
      setStudent(random(names));
    }
  };

  const handleStudent = () => {
    // Start Load
    setLoad(!isLoading);
    // Play Sound
    const audioEl = new Audio(Secret);
    audioEl.volume = 1;
    audioEl.play();

    // SetTimeOut para dar sensação de espera
    setTimeout(
      function () {
        // Remove o Load
        setLoad(false);
        // Atribui o Aluno ao state
        chooseStudent();
      }.bind(this),
      2800
    );
  };

  useEffect(() => {
    let existing = localStr;
    existing = existing ? existing : [];

    if (student) {
      existing.push(student);
      saveStorage(storageVar, existing);
    }
  }, [student]);

  return (
    <section>
      <div className="turmaInfo">{title}</div>
      {localStr && (
        <span
          className="navButton deleteButton"
          onClick={() => {
            deleteStorage(storageVar);
            window.location.reload(false);
          }}
        >
          <Trash />
        </span>
      )}
      {localStr && (
        <span
          className={`navButton showhide ${board ? "show" : "hide"}`}
          onClick={() => showBoard(!board)}
        >
          <Arrow />
        </span>
      )}
      {localStr && (
        <div className={`quadro ${!board && "show"}`}>
          <div>
            {localStr.map((item) => {
              return <span key={item}>{item}</span>;
            })}
          </div>
        </div>
      )}
      <div className="container">
        <div className="nuvem">
          <h3>Who will Choose the Song?</h3>
          {isLoading && (
            <div className="loaderRand">
              <img src={require("../../images/load.gif")} />
            </div>
          )}
          {!isLoading && student && <span className="ml2">{student}</span>}
          <TextBallon />
        </div>
        <div className="boxKids">
          <button
            className="button"
            onClick={() => !isLoading && handleStudent()}
          >
            Escolher Aluno
          </button>
          <BoxStudents />
        </div>
      </div>
    </section>
  );
};

export default Class;
