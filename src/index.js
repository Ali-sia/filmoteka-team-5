// Подключение лоадера
import './js/dom/loader';
//Подчеркивание текущей страницы в хедере
import { activePage } from "./js/dom/activePage";
activePage();

//Активация кнопки в хедере страницы библиотеки
import { activeLibraryBtn } from "./js/dom/activeLibraryBtn";
activeLibraryBtn();

//Завантаження популярних фільмів
import FilmsApiService from './js/api/api-server';
import { appendPopularMarkup } from './js/dom/show-popular-films';
import { resetMarkup } from './js/dom/show-popular-films';
const filmsApiServise = new FilmsApiService();

resetMarkup()
firstLoadPage()

async function firstLoadPage() {
   const response = await filmsApiServise.fetchPopularFilms()
   appendPopularMarkup(response)
      
   //доступ до фільму по ID без повторного запиту на сервер, ID зберігається в дата атрибуті на карточці фільму --> data-films-id
    let filmById = filmsApiServise.getFilmById(897192) 
    console.log(filmById)
}