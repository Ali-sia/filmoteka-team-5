// класс для запитів до api
import axios from 'axios';
import { API_KEY } from './api-key';

export default class FilmsApiService {
  constructor() {
    this.totalPages = 0,
    this.data = [],
    this.genres = []

  }
  async fetchPopularFilms(page) {
    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`;

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

  async getFilmByName(nameFilm) {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${nameFilm}`;

    let { data: { results } } = await axios.get(URL);

    //Создание исключения при отсутсвии фильмов в базе
    if (results.length === 0) {
      throw new Error();
    };
    
    //Добавление найденных фильмов в массив локальных данных
    results.map(film => {
      if (!this.getFilmById(film.id)) {
        this.data.push(film);
      }
    });
    
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
  
}
