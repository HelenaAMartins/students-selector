let failedLoadAttempts = 2;
let failedSaveAttempts = 2;

class StorageNotes {
  static load(storageLocal) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttempts > 1) {
          const data = window.localStorage.getItem(storageLocal);
          resolve(data ? JSON.parse(data) : []);
        } else {
          reject();
          failedLoadAttempts++;
        }
      }, 2000);
    });
  }

  static save(storageLocal, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedSaveAttempts > 1) {
          window.localStorage.setItem(storageLocal, JSON.stringify(data));
          resolve();
        } else {
          reject();
          failedSaveAttempts++;
        }
      }, 2000);
    });
  }
}

export default StorageNotes;
