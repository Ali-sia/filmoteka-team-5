// класс для запитів до api
import axios from 'axios';
import { API_KEY } from './api-key';

export default class FilmsApiService {
  constructor() {
    this.totalPages = 0,
    this.page = 0,
    this.isPopular = false;
    this.nameFilm = "",
    this.data = [],
    this.genres = []

  }
  async fetchPopularFilms(page) {
    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;

    const response = await axios.get(URL);
    this.totalPages = response.data.total_pages;
    this.data = response.data.results;
    return response.data.results;
  }

  getFilmById(id) {
    for (const film of this.data) {
      if (film.id === id) {
        return film
      }
    }
  }

    async getFilmByName() {
      const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.nameFilm}&page=${this.page}`;

      let { data: { results, total_pages } } = await axios.get(URL);
      this.totalPages = total_pages;

      //Создание исключения при отсутсвии фильмов в базе
      if (results.length === 0) {
        throw new Error();
      };
      
      //Добавление найденных фильмов в переменные массива
      this.data = results;
      
      return results;
    }

  async fetchGenres() {
    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    const response = await axios.get(URL);
    this.genres = response.data.genres;
    return  response.data.genres;
  }

  getTotalPages() {
      return this.totalPages
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
}
