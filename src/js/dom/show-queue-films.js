// відмалювати фільми з списку "Queue"

const bodyEl = document.querySelector('.films__list');
console.log(bodyEl);

const getQueue = localStorage.getItem('queue-films');
const queueArray = JSON.parse(getQueue);
console.log(queueArray);
function createMarcup(data) {
  return data
    .map(
      obj => `<article class="films__film-card" data-films-id="${obj.id}">
          <img
            class="films__img"
            srcset="
              https://image.tmdb.org/t/p/w300/${obj.poster_path}   300w,
              https://image.tmdb.org/t/p/w500/${obj.poster_path}   500w,
              https://image.tmdb.org/t/p/w780/${obj.poster_path}   780w,
              https://image.tmdb.org/t/p/w1280/${obj.poster_path}   1280w,
              https://image.tmdb.org/t/p/original/${obj.poster_path} 2000w

            "
            loading="lazy"
            src="https://image.tmdb.org/t/p/w300/${obj.poster_path}"
            alt="Poster of the film ${obj.title}",
            sizes="(max-width: 320px) 280px,
              (max-width: 768px) 340px,
              400px"
          />

          <div class="films__info">
            <h2 class="films__title">${obj.title}</h2>
          </div>
        </article>
        `
    )
    .join('');
}
console.log(createMarcup(queueArray));
createMarcup(queueArray);

// const films = queueArray.map(
//   ({ poster_path, title, genre_ids, release_date, id }) => {
// ` <article class="films__film-card" data-films-id="${id}">
//       <img
//         class="films__img"
//         srcset="
//           https://image.tmdb.org/t/p/w300/${poster_path}   300w,
//           https://image.tmdb.org/t/p/w500/${poster_path}   500w,
//           https://image.tmdb.org/t/p/w780/${poster_path}   780w,
//           https://image.tmdb.org/t/p/w1280/${poster_path}   1280w,
//           https://image.tmdb.org/t/p/original/${poster_path} 2000w

//         "
//         loading="lazy"
//         src="https://image.tmdb.org/t/p/w300/${poster_path}"
//         alt="Poster of the film ${title}",
//         sizes="(max-width: 320px) 280px,
//           (max-width: 768px) 340px,
//           400px"
//       />

//       <div class="films__info">
//         <h2 class="films__title">${title}</h2>
//       </div>
//     </article>
//     `;
//   }
// );
// console.log(films);

bodyEl.insertAdjacentHTML('beforeend', createMarcup(queueArray));
// console.log(bodyEl.insertAdjacentHTML('afterbegin', films));
