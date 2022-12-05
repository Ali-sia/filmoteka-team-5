import { getElement } from "./getElement";

export function activeLibraryBtn() {
    if (getElement(".header__libraryListBunnon")) {
        getElement(".header__libraryListBunnon").addEventListener('click', onClick);
    }
}

function onClick(event) {
    if (event.target.disabled || event.target.tagName != "BUTTON") {
        return;
    }

    const className = "header__libraryButton--isActive"

    if (getElement(`.${className}`)) {
        getElement(`.${className}`).disabled = false;
        getElement(`.${className}`).classList.toggle(className);
    };
        
    event.target.disabled = true;
    event.target.classList.add(className);
}