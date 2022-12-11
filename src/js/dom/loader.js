window.addEventListener('load', () => setTimeout (function() {
    const loader = document.querySelector('.loader');
    console.log(loader)
    loader.classList.add('loader--hidden');
    loader.addEventListener('transitionend', () => {
    document.body.removeChild(loader);
  })
}, 500)
);

// window.addEventListener('load', () => setTimeout (function() {
//     const loader = document.querySelector('.loader');
//     loader.classList.add('loader--hidden');
//   //   loader.addEventListener('transitionend', () => {
//   //   document.body.classList.remove('loader');
//   // })
// }, 500)
// );

