import React, { Fragment } from "react";

import { Arrow, Trash } from "../../utils/Icons";
import TrashSound from "../../audio/trash.mp3";

const Board = ({ handleBoard, handleDelete, names, status, students }) => {
  const PlayTrash = () => {
    // Play Sound
    const audioEl = new Audio(TrashSound);
    audioEl.volume = 0.3;
    audioEl.play();
  };

  const handleTrash = (item) => {
    PlayTrash();
    handleDelete(item);
  };

  return (
    <Fragment>
      {students && students.length > 0 && (
        <span
          className="navButton deleteButton"
          onClick={() => handleTrash("all")}
        >
          <Trash />
        </span>
      )}
      {students && students.length > 0 && (
        <span
          className={`navButton showhide ${status ? "show" : "hide"}`}
          onClick={() => handleBoard()}
        >
          <Arrow />
        </span>
      )}
      {students && students.length > 0 && (
        <div className={`quadro ${!status && "show"}`}>
          <small className="qtdBoard">
            {students.length + " de " + names.length}
          </small>
          <div>
            <ul>
              {students.map((item) => {
                return (
                  <li key={item} onClick={(e) => handleTrash(item)}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Board;
