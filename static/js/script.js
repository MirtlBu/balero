(function() {
  const BODYELEM = document.querySelector('body');
  const HAMBURGERELEM = document.querySelector('.hamburger');
  const HAMBURGERACTIVE = 'hamburger--active';
  const NAVELEM = document.querySelector('.nav__items');
  const NAVELEMS = document.querySelectorAll('.nav__item');
  const NAVACTIVE = 'nav__items--active';

  NAVELEMS.forEach(element => {
    element.addEventListener('click', function(e) {
      let block = this.dataset.block;
      document.querySelector('.' + block).scrollIntoView({behavior: "smooth"});
    });
  });

  HAMBURGERELEM.addEventListener('click', function(e) {
    e.stopPropagation();
    HAMBURGERELEM.classList.contains(HAMBURGERACTIVE) ? HAMBURGERELEM.classList.remove(HAMBURGERACTIVE) : HAMBURGERELEM.classList.add(HAMBURGERACTIVE);
    NAVELEM.classList.contains(NAVACTIVE) ? NAVELEM.classList.remove(NAVACTIVE) : NAVELEM.classList.add(NAVACTIVE);
  });

  BODYELEM.addEventListener('click', function() {
    if(NAVELEM.classList.contains(NAVACTIVE)) {
      NAVELEM.classList.remove(NAVACTIVE);
      HAMBURGERELEM.classList.remove(HAMBURGERACTIVE);
    }
  });

  new WOW().init();
})()
