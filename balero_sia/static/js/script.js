(function() {
  const body = document.querySelector('body');
  const navitems = document.querySelectorAll('.nav__item');

  navitems.forEach(element => {
    element.addEventListener('click', function(e) {
      let block = this.dataset.block;
      document.querySelector('.' + block).scrollIntoView({behavior: "smooth"});
    });
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
      .fromTo("#feature_appear1", 1, {opacity: 1}, {opacity: 0, delay: 1, ease: Linear.easeNone})
      .fromTo("#feature_appear2", 1, {opacity: 0}, {opacity: 1, ease: Linear.easeNone})
      .to("#feature_appear2", 1, {opacity: 0, delay: 1, ease: Linear.easeNone})
      .fromTo("#feature_appear3", 1, {opacity: 0}, {opacity: 1, ease: Linear.easeNone});
   var scroll2 = new ScrollMagic.Scene({
              triggerElement: '.features',
              triggerHook: "onLeave",
              duration: "100%"
            })
            .setPin('.features')
            .setTween(wipeAnimation2) 
            .addTo(controller);


})()
