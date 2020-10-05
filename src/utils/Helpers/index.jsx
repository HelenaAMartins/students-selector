export const saveStorage = (target, arr) => {
  // Salva no Storage os Alunos que ainda nao escolheram a música
  localStorage.setItem(target, JSON.stringify(arr));
  console.log("Salvo", arr);
};

export const deleteStorage = (storedData) => {
  localStorage.removeItem(storedData);
  console.log("Storage Removido");
};

export const random = (data) => {
  const random = Math.floor(Math.random() * data.length);
  return data[random];
};

export const getImage = (title) => {
  
  const letsPlayImg = require("../../images/lets-play.jpg");
  let image = "";
  
  switch (title) {
    case "Giraffe":
      image = require("../../images/games/giraffe.jpg");
      break;
    case "Hipoppotamus":
      image = require("../../images/games/hipoppotamus.jpg");
      break;
    case "Lemur":
      image = require("../../images/games/lemur.jpg");
      break;
    case "Lion":
      image = require("../../images/games/lion.jpg");
      break;
    case "Penguin":
      image = require("../../images/games/penguin.jpg");
      break;
    case "Zebra":
      image = require("../../images/games/zebra.jpg");
      break;
    default:
      image = letsPlayImg;
  }

  return image;
};
