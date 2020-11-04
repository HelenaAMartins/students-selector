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

export const convertSlug = (str) => {
  console.log(str);
  str && str;
  return str;
};

export const getImage = (arr, imgPath) => {
  const obj =
    arr.length > 0 &&
    arr.slice(-1)[0].split(" ").join("").replace(".", "").toLowerCase();
  const image = imgPath[obj] ? imgPath[obj] : imgPath["_lets-play"];
  return image;
};
