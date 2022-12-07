export default class WatchedFilmsStorage {
  constructor() {
    this._watchedFilmsList = [];
    this.refreshData();
  }
  refreshData() {
    if (localStorage.getItem('watched-films')) {
      this._watchedFilmsList = JSON.parse(
        localStorage.getItem('watched-films')
      );
    }
  }

  addToWatchedFilms(item) {
    if (localStorage.getItem('watched-films')) {
      this._watchedFilmsList = JSON.parse(
        localStorage.getItem('watched-films')
      );
    }
    this._watchedFilmsList.push(item);
    this.saveWatchedFilms();
  }

  saveWatchedFilms() {
    localStorage.setItem(
      'watched-films',
      JSON.stringify(this._watchedFilmsList)
    );
  }

  getWathedFilmsList() {
    if (!localStorage.getItem('watched-films')) {
      return;
    }
    // this._watchedFilmsList = JSON.parse(localStorage.getItem('watched-films'));
    return JSON.parse(localStorage.getItem('watched-films'));
  }
 
  removeFromWatched(film) {
    if (!localStorage.getItem('watched-films')) {
      return;
    }
    this._watchedFilmsList = JSON.parse(localStorage.getItem('watched-films'));
    const index = this._watchedFilmsList.findIndex(
      option => option.title === film.title
    );
    this._watchedFilmsList.splice(index, 1);
    this.saveWatchedFilms();
  }
  checkFilmInWatchedLocStor(film) {
    if (!localStorage.getItem('watched-films')) {
      return;
    }
    this._watchedFilmsList = JSON.parse(localStorage.getItem('watched-films'));
    const answer = this._watchedFilmsList.find(
      option => option.title === film.title
    );
    if (answer) {
      return true;
    }
    return false;
  }
}
