import React from "react";

const Error = ({ onRetry }) => (
  <div className="error">
    <h1>Ops!</h1>
    <p>Ocorreu um erro inseperado ao carregar a lista de notas.</p>
    <button onClick={() => onRetry()} className="button btn-reload">
      Tentar Novamente
    </button>
  </div>
);

export default Error;
