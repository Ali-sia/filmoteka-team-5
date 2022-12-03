// відмалювати популярні фільми
import {list} from '../refs'

export function createPopularMarkup(data) {
  return data
    .map(
      ({ poster_path, title, overview, id }) =>
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
          <p class="films__title">${title}</p>

          <p class="films__genres">${overview} <span class="films__year"></span> </p>
        </div>
      </div>
       `
    )
    .join('');
}
export function resetMarkup() {
    list.innerHTML='';
}
export function appendPopularMarkup(data) {
  list.insertAdjacentHTML('beforeend', createPopularMarkup(data));
}
