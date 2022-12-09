// класс для запитів до api
import axios from 'axios';
import { API_KEY } from './api-key';

export default class FilmsApiService {
  constructor() {
    (this.totalPages = 0), (this.page = 0), (this.isPopular = false),
    (this.nameFilm = ''), (this.searchGenre = ''), (this.data = []), (this.genres = []), (this.isWatchedOpen = 0), (this.isQueueOpen = 0)
  }
  async fetchPopularFilms() {
    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;

    const response = await axios.get(URL);
    this.totalPages = response.data.total_pages;
    this.data = response.data.results;
    return response.data.results;
  }

  getFilmById(id) {
    for (const film of this.data) {
      if (film.id === id) {
        return film;
      }
    }
  }

  async getFilmByName() {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.nameFilm}&page=${this.page}`;

    let {
      data: { results, total_pages },
    } = await axios.get(URL);
    this.totalPages = total_pages;

    //Создание исключения при отсутсвии фильмов в базе
    if (results.length === 0) {
      throw new Error();
    }

    //Добавление найденных фильмов в переменные массива
    this.data = results;
    console.log('getFilmByName:', results);
    return results;
  }

  async fetchFilmsByGenres() {
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.searchGenre}&page=${this.page}`;
    const response = await axios.get(URL);
    console.log('Responce-fetchFilmsByGenres', response);
    this.totalPages = response.data.total_pages;
    console.log('this.totalPages: ', this.totalPages);
    this.data = response.data.results;
    console.log('this.data: ', this.data);
    console.log('fetchFilmsByGenres', response.data.results);
    return response.data.results;
  }

  async fetchGenres() {
    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    const response = await axios.get(URL);
    this.genres = response.data.genres;
    // console.log('genres:', this.genres);
    return response.data.genres;
  }

  getTotalPages() {
    return this.totalPages;
  }

  getPage() {
    return this.page;
  }

  getIsPopular() {
    return this.isPopular;
  }

  setPage(page) {
    this.page = page;
  }

  setIsPopular(isPopular) {
    this.isPopular = isPopular;
  }

  setNameFilm(nameFilm) {
    this.nameFilm = nameFilm;
  }

  setData(data) {
    this.data = data;
  }

  setWathedOpen() {
    this.isWatchedOpen = 1;
     this.isQueueOpen = 0;
  }
   setQueueOpen() {
    this.isWatchedOpen = 0;
     this.isQueueOpen = 1;
  }

  setTotalPages(totalPages) {
    this.totalPages = totalPages;
  }

  setSearchGenre(searchGenre) {
    this.searchGenre = searchGenre;
  }
  
}
