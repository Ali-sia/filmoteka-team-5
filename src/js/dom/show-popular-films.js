// відмалювати популярні фільми
import {list} from '../refs'

export function createPopularMarkup(data) {
  return data
    .map(
      ({ poster_path, title, overview, genre_ids, release_date, id }) => 
        ` <div class="films__film-card" data-films-id="${id}">
        <img
          class="films__img"
          srcset="
            https://image.tmdb.org/t/p/w300/${poster_path}   300w,
            https://image.tmdb.org/t/p/w500/${poster_path}   500w,
            https://image.tmdb.org/t/p/w780/${poster_path}   780w,
            https://image.tmdb.org/t/p/w1280/${poster_path}   1280w,
            https://image.tmdb.org/t/p/original/${poster_path} 2000w
            
          "
          loading="lazy"
          src="https://image.tmdb.org/t/p/w300/${poster_path}"
          alt="#"
          sizes="(max-width: 320px) 280px,
            (max-width: 768px) 340px,
            400px"
        />

        <div class="films__info">
          <h2 class="films__title">${title}</h2>

          <p class="films__genres">${genresList(genre_ids)} | ${release_date?.slice(
            0,
            4
          )}</p>
        </div>
      </div>
      `
    )
    .join('');
}

function genresList(array) {
  let genre_names = '';
  let foundGenres = 0;
  const arrGenres = JSON.parse(localStorage.getItem('genres'));
  for (const id of array) {
    const genre_name = arrGenres.find(genre => id === genre.id);
    if (!genre_name) {
      continue;
    }
    if (genre_names) {
      genre_names += ', ';
    }
    if (foundGenres === 2) {
      genre_names += 'Others';
      break;
    }

    foundGenres += 1;
    genre_names += genre_name.name;
  }
  if (!genre_names) {
    genre_names = 'unknown';
  }
  return genre_names;
}

export function resetMarkup() {
    list.innerHTML='';
}
export function appendPopularMarkup(data) {
  list.insertAdjacentHTML('beforeend', createPopularMarkup(data));
}
