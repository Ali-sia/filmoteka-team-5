export default class QueueFilmsStorage {
  constructor() {
    this._queueFilmsList = [];
    this.refreshDataQueue();
  }

  refreshDataQueue() {
    if (localStorage.getItem('queue-films')) {
      this._queueFilmsList = JSON.parse(localStorage.getItem('queue-films'));
    }
    return;
  }

  myAddToQueueFilms(film) {
    if (localStorage.getItem('queue-films')) {
      this._queueFilmsList = JSON.parse(localStorage.getItem('queue-films'));
    }

    this._queueFilmsList.push(film);
    localStorage.setItem('queue-films', JSON.stringify(this._queueFilmsList));
  }

//   addToQueueFilms(item) {
//     if (localStorage.getItem('queue-films')) {
//       this._queueFilmsList = JSON.parse(localStorage.getItem('queue-films'));
//     }
//     this._queueFilmsList.push(item);
//     this.saveQueueFilms();
//   }
  saveQueueFilms() {
    localStorage.setItem('queue-films', JSON.stringify(this._queueFilmsList));
  }

  getQueueFilmsList() {
    if (!localStorage.getItem('queue-films')) {
      return;
    }
    return JSON.parse(localStorage.getItem('queue-films'));
  }
  removeFromQueue(film) {
    if (!localStorage.getItem('queue-films')) {
      return;
    }
    this._queueFilmsList = JSON.parse(localStorage.getItem('queue-films'));
    const index = this._queueFilmsList.findIndex(
      option => option.title === film.title
    );
    this._queueFilmsList.splice(index, 1);
    this.saveQueueFilms();
  }

  checkFilmInQueueLocStor(film) {
    if (!localStorage.getItem('queue-films')) {
      return;
    }
    this._queueFilmsList = JSON.parse(localStorage.getItem('queue-films'));
    const answer = this._queueFilmsList.find(
      option => option.title === film.title
    );
    if (answer) {
      return true;
    }
    return false;
  }
}
