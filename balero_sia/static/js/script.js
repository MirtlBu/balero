(function() {
  const body = document.querySelector('body');
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const navitems = document.querySelectorAll('.nav__item');

  hamburger.addEventListener('click', function(e) {
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



  var controller = new ScrollMagic.Controller();

  var wipeAnimation1 = new TimelineMax()
      .fromTo("#about_appear1", 1, {y: "0", x: "0%"}, {y: "0%", x: "0%", ease: Linear.easeNone})
      .fromTo("#about_appear2", 1, {y: "-100%", x: "0%"}, {y: "0%", x: "0%", ease: Linear.easeNone})
      .fromTo("#about_appear3", 1, {y: "-100%", x: "0%"}, {y: "0%",x: "0%", ease: Linear.easeNone});

   // create a scene for each element
   var scroll1 = new ScrollMagic.Scene({
              triggerElement: '.about', // y value not modified, so we can use element as trigger as well
              triggerHook: "onLeave",
              duration: "200%"
            })
            .setPin('.about')
            .setTween(wipeAnimation1) 
            .addTo(controller);

  var wipeAnimation2 = new TimelineMax()
      .fromTo("#feature_appear1", 1, {opacity: 1}, {opacity: 0, ease: Linear.easeNone})
      .fromTo("#feature_appear2", 1, {opacity: 0}, {opacity: 1, ease: Linear.easeNone})
      .to("#feature_appear2", 1, {opacity: 0, ease: Linear.easeNone})
      .fromTo("#feature_appear3", 1, {opacity: 0}, {opacity: 1, ease: Linear.easeNone});

   // create a scene for each element
   var scroll2 = new ScrollMagic.Scene({
              triggerElement: '.features', // y value not modified, so we can use element as trigger as well
              triggerHook: "onLeave",
              duration: "100%"
            })
            .setPin('.features')
            .setTween(wipeAnimation2) 
            .addTo(controller);


    

})()
