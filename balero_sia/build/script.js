(function() {
  const body = document.querySelector('body');
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const navitems = document.querySelectorAll('.nav__item');

  hamburger.addEventListener('click', function(e) {
    console.log('hui')
    e.stopPropagation();
    hamburger.classList.contains('hamburger--active') ? hamburger.classList.remove('hamburger--active') : hamburger.classList.add('hamburger--active');
    sidebar.classList.contains('sidebar--active') ? sidebar.classList.remove('sidebar--active') : sidebar.classList.add('sidebar--active');
  });

  body.addEventListener('click', function() {
    if(sidebar.classList.contains('sidebar--active')) {
      sidebar.classList.remove('sidebar--active');
      hamburger.classList.remove('hamburger--active');
    }
  });

  navitems.forEach(element => {
    element.addEventListener('click', function(e) {
      let block = this.dataset.block;
      document.querySelector('.' + block).scrollIntoView({behavior: "smooth"});
    });
  });

  document.addEventListener("scroll", function() {
    // get the active element and call blur
    document.activeElement.blur();
  });

//////////////////////////////letters animation///////////////////////////////////////

    document.querySelectorAll('.text-wrapper__line')
        .forEach(e => e.innerHTML = e.textContent.replace(/[^ ]+/g, "<span class='text-wrapper__word'>$&</span>"));
    document.querySelectorAll('.text-wrapper__word')
        .forEach(e => e.innerHTML = e.textContent.replace(/[^ ]/g, "<span class='text-wrapper__letter'>$&</span>"));

    anime.timeline({loop: false})
      .add({
        targets: ['.text-wrapper__letter'],
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i+1)
      });

//////////////////////////////scroll magic///////////////////////////////////////

  var controller = new ScrollMagic.Controller();

  var wipeAnimation1 = new TimelineMax()
      .fromTo("#about_appear2", 1, {opacity: 0}, {opacity: 1, ease: "none", delay: 1})
      .fromTo("#about_appear3", 1, {opacity: 0}, {opacity: 1, ease: "none", delay: 1});
   var scroll1 = new ScrollMagic.Scene({
              triggerElement: '.about',
              triggerHook: "onLeave",
              duration: "200%"
            })
            .setPin('.about')
            .setTween(wipeAnimation1) 
            .addTo(controller);

  var wipeAnimation2 = new TimelineMax()
      .fromTo("#feature_appear1", 5, {opacity: 1}, {opacity: 0, delay: 5, ease: Linear.easeNone})
      .fromTo("#feature_appear2", 5, {opacity: 0}, {opacity: 1, ease: Linear.easeNone})
      .to("#feature_appear2", 5, {opacity: 0, delay: 5, ease: Linear.easeNone})
      .fromTo("#feature_appear3", 5, {opacity: 0}, {opacity: 1, ease: Linear.easeNone});
   var scroll2 = new ScrollMagic.Scene({
              triggerElement: '.features',
              triggerHook: "onLeave",
              duration: "100%"
            })
            .setPin('.features')
            .setTween(wipeAnimation2) 
            .addTo(controller);


})()
