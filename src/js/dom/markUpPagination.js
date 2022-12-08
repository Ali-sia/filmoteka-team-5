import {filmsApiServise} from '../../index';

export function markupPagination() {
    //Скрытие ненужных кнопок
    if (filmsApiServise.getPage() != 1 && window.screen.width >= 768) {
        document.querySelector('.pagination__button--button1').style.display = "block";
        document.querySelector('.pagination__item--item2').style.display = "block";
    } else {
        document.querySelector('.pagination__button--button1').style.display = "none";
        document.querySelector('.pagination__item--item2').style.display = "none";
    }

    if (filmsApiServise.getPage() > 4 && window.screen.width >= 768) {
        document.querySelector('.pagination__item--item3').style.display = "block";
    } else {
        document.querySelector('.pagination__item--item3').style.display = "none";
    }

    if (filmsApiServise.getPage() > 3 ) {
        document.querySelector('.pagination__item--item4').style.display = "block";
    } else {
        document.querySelector('.pagination__item--item4').style.display = "none";
    }

    if (filmsApiServise.getPage() > 2 ) {
        document.querySelector('.pagination__item--item5').style.display = "block";
    } else {
        document.querySelector('.pagination__item--item5').style.display = "none";
    }

    if (filmsApiServise.getPage() + 1 < filmsApiServise.getTotalPages()) {
        document.querySelector('.pagination__item--item7').style.display = "block";
    } else {
        document.querySelector('.pagination__item--item7').style.display = "none";
    }

    if (filmsApiServise.getPage() + 2 < filmsApiServise.getTotalPages()) {
        document.querySelector('.pagination__item--item8').style.display = "block";
    } else {
        document.querySelector('.pagination__item--item8').style.display = "none";
    }

    if (filmsApiServise.getPage() + 3 < filmsApiServise.getTotalPages() && window.screen.width >= 768) {
        document.querySelector('.pagination__item--item9').style.display = "block";
    } else {
        document.querySelector('.pagination__item--item9').style.display = "none";
    }

    if (filmsApiServise.getPage() != filmsApiServise.getTotalPages() && window.screen.width >= 768) {
        document.querySelector('.pagination__item--item10').style.display = "block";
        document.querySelector('.pagination__button--button8').style.display = "block";
    } else {
        document.querySelector('.pagination__item--item10').style.display = "none";
        document.querySelector('.pagination__button--button8').style.display = "none";
    }

    //Заполнение значениями кнопки
    document.querySelector('.pagination__button--button3').textContent = `${filmsApiServise.getPage() - 2}`;
    document.querySelector('.pagination__button--button4').textContent = `${filmsApiServise.getPage() - 1}`;
    document.querySelector('.pagination__currentPage').textContent = `${filmsApiServise.getPage()}`;
    document.querySelector('.pagination__button--button5').textContent = `${filmsApiServise.getPage() + 1}`;
    document.querySelector('.pagination__button--button6').textContent = `${filmsApiServise.getPage() + 2}`;
    document.querySelector('.pagination__button--button7').textContent = `${filmsApiServise.getTotalPages()}`;

    document.querySelector('.pagination__container').style.display = "block";
}