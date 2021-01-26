(function() {
  const BODY = document.querySelector('body');
  const HAM = document.querySelector('.hamburger');
  const NAV = document.querySelector('.nav__items');
  const NAVS = document.querySelectorAll('.nav__item');
  const HAMACTIVE = 'hamburger--active';
  const NAVACTIVE = 'nav__items--active';

  //scroll
  NAVS.forEach(element => {
    element.addEventListener('click', function(e) {
      let block = this.dataset.block;
      document.querySelector('.' + block).scrollIntoView({behavior: "smooth"});
    });
  });

  //nav panel logic
  HAM.addEventListener('click', function(e) {
    e.stopPropagation();
    HAM.classList.contains(HAMACTIVE) ? HAM.classList.remove(HAMACTIVE) : HAM.classList.add(HAMACTIVE);
    NAV.classList.contains(NAVACTIVE) ? NAV.classList.remove(NAVACTIVE) : NAV.classList.add(NAVACTIVE);
  });

  BODY.addEventListener('click', function() {
    if(NAV.classList.contains(NAVACTIVE)) {
      NAV.classList.remove(NAVACTIVE);
      HAM.classList.remove(HAMACTIVE);
    }
  });

  //animation plugin
  AOS.init({
   duration: 700
  });

  document.addEventListener("scroll", function() {
      // get the active element and call blur
      document.activeElement.blur();
  });
})()
