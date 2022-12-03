// класс для запитів до api
import axios from 'axios';
import { API_KEY } from './api-key';

export default class FilmsApiService {
  constructor() {
    this.data = []
    this.genres = []

  }
  async fetchPopularFilms() {
    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

    const response = await axios.get(URL);

    this.data = response.data.results;
    console.log(this.data)
    return response.data.results;
  }

  getFilmById(id) {
    for (const film of this.data) {
      if (film.id === id) {
        return film
      }
    }
  }

async fetchGenres() {
  const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  const response = await axios.get(URL);
  this.genres = response.data.genres;
  return  response.data.genres;
}
}
