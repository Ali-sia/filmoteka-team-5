import { getElement } from "./getElement";

export function activePage() {
    if (getElement(".header__container").classList.contains("header__container--is-library")) {
        isActivePage('[data-ref="library"]');
        return;
    }

    isActivePage('[data-ref="home"]');
}

function isActivePage(selector) {
    getElement(selector).classList.add("header__nav-item--is-active");
}