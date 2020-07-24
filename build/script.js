(function() {
  const BODY = document.querySelector('body');
  const HAM = document.querySelector('.hamburger');
  const NAV = document.querySelector('.nav__items');
  const NAVS = document.querySelectorAll('.nav__item');

  const ACTIVE = '--active';

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
    HAM.classList.contains(HAM + ACTIVE) ? HAM.classList.remove(HAM + ACTIVE) : HAM.classList.add(HAM + ACTIVE);
    NAV.classList.contains(NAV + ACTIVE) ? NAV.classList.remove(NAV + ACTIVE) : NAV.classList.add(NAV + ACTIVE);
  });

  BODY.addEventListener('click', function() {
    if(NAV.classList.contains(NAV + ACTIVE)) {
      NAV.classList.remove(NAV + ACTIVE);
      HAM.classList.remove(HAM + ACTIVE);
    }
  });

  //animation plugin
  AOS.init({
   duration: 700
  });
})()
