import React, { Fragment } from "react";

import { Arrow, Trash } from "../../utils/Icons";
import { deleteStorage } from "../../utils/Helpers";
import TrashSound from "../../audio/trash.mp3";

const Board = ({
  students,
  localStorage,
  status,
  handleBoard,
  handleDelete,
}) => {
  const PlayTrash = () => {
    // Play Sound
    const audioEl = new Audio(TrashSound);
    audioEl.volume = 0.3;
    audioEl.play();
  };

  const handleTrash = (localStorage) => {
    PlayTrash();
    deleteStorage(localStorage);
    // SetTimeOut para dar sensação de espera
    setTimeout(
      function () {
        window.location.reload(false);
      }.bind(this),
      1000
    );
  };

  const handleTrashItem = (item) => {
    PlayTrash();
    handleDelete(item);
  };

  return (
    <Fragment>
      {students && students.length > 0 && (
        <span
          className="navButton deleteButton"
          onClick={() => handleTrash(localStorage)}
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
          <div>
            {students.map((item) => {
              return (
                <span key={item} onClick={(e) => handleTrashItem(item)}>
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Board;
