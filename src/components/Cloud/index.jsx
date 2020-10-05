import React from "react";
import { TextBallon, LoadImg } from "../../utils/Icons";

const Cloud = ({ title, students, isLoading }) => {
  return (
    <div className="nuvem">
      <h3>{title}</h3>
      {isLoading && (
        <div className="loaderRand">
          <LoadImg />
        </div>
      )}
      {!isLoading && students && <span className="ml2">{students.slice(-1)[0]}</span>}
      <TextBallon />
    </div>
  );
};

export default Cloud;
