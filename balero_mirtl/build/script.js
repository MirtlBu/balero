const sections = document.querySelectorAll("section");

function goToSection(section, anim) {
  gsap.to(window, {
    scrollTo: {y: section, autoKill: false},
    duration: 2
  });
  
  if(anim) {
    anim.restart();
  }
}

sections.forEach(section => {

  const intoAnim = gsap.timeline({paused: true})
  .from(section.querySelector(".anim3"), {yPercent: 80, duration: 1})
  .from(section.querySelector(".anim1"), {yPercent: -80, duration: 1},'-=1')
  .from(section.querySelector(".anim2"), {yPercent: 70, duration: 1},'-=1')
  .from(section.querySelector(".anim4"), {yPercent: -50, duration: 1},'-=1.5')
  



  ScrollTrigger.create({
    trigger: section,
    onEnter: () => goToSection(section, intoAnim),
    onEnterBack: () => goToSection(section, intoAnim)
  });

});
////////learn more////////

function toggleThisOpacity(element) {
  return gsap.to(element, {
                  opacity: 0,
                  duration: 2
                });
}

const h2 = document.querySelector(".features__h2");

var h2Toggle = toggleThisOpacity(h2);
h2Toggle.reverse();

const ftext = document.querySelector(".features .text");

var ftextToggle = gsap.to(ftext, {
    opacity: 0,
    duration: 1
  });
ftextToggle.reverse();

const more = document.querySelector(".features__link");

var moreToggle = gsap.to(more, {
    opacity: 0,
    duration: 0.5
  });
moreToggle.reverse();

const back = document.querySelector(".features__back");

var backToggle = gsap.to(back, {
    opacity: 0,
    duration: 0.5
  });


const features = document.querySelector(".features");
const grow = document.querySelector(".features .anim3");
const shrink1 = document.querySelector(".features .anim2");
const shrink2 = document.querySelector(".features .anim4");
var growToggle = gsap.to(grow, {
    width: '70vw',
    borderWidth: '0px',
    duration: 1
  });
growToggle.reverse();
var shrink1Toggle = gsap.to(shrink1, {
    width: '0vw',
    padding: '0px',
    flex: 'none',
    background: 'none',
    borderWidth: '0px',
    duration: 1
  });
shrink1Toggle.reverse();
var shrink2Toggle = gsap.to(shrink2, {
    width: '0vw',
    padding: '0px',
    flex: 'none',
    background: 'none',
    borderWidth: '0px',
    duration: 1
  });
shrink2Toggle.reverse();



const arrows = document.querySelectorAll(".arrow");

more.addEventListener('click', function(e){
  e.stopPropagation();
  growToggle.play();
  shrink1Toggle.play();
  shrink2Toggle.play();
  h2Toggle.play();
  ftextToggle.play();
  moreToggle.play();
  backToggle.reverse();

  arrows.forEach(element => {
    element.classList.contains('arrow--active') ? element.classList.remove('arrow--active') : element.classList.add('arrow--active');
  });
});
back.addEventListener('click', function(e){
  e.stopPropagation();
  growToggle.reverse();
  shrink1Toggle.reverse();
  shrink2Toggle.reverse();
  h2Toggle.reverse();
  ftextToggle.reverse();
  moreToggle.reverse();
  backToggle.play();
  arrows.forEach(element => {
    element.classList.contains('arrow--active') ? element.classList.remove('arrow--active') : element.classList.add('arrow--active');
  });
});

/////////slider//////////

const container = document.querySelector(".slider__items");
const slides = document.querySelectorAll(".slider__item");
const slider = document.querySelector(".slider");

let oldSlide = 0;
let activeSlide = 0;
let dur = 2;
let offsets = [];
let iw = slider.offsetWidth;

document.querySelector("#leftArrow").addEventListener("click", slideAnim);
document.querySelector("#rightArrow").addEventListener("click", slideAnim);


sizeIt();

function slideAnim(e) {

  oldSlide = activeSlide;
  if (gsap.isTweening(container)) {
    return;
  }
    // arrow clicks
  if (this.id === "leftArrow" || this.id === "rightArrow") {
    activeSlide = this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1);
  }  else {
    activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
  }

  // make sure we're not past the end or beginning slide
  activeSlide = activeSlide < 0 ? 0 : activeSlide;
  activeSlide = activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
  if (oldSlide === activeSlide) {
    return;
  }
  // if we're dragging we don't animate the container
  if (this.id != "dragger") {
    gsap.to(container, dur, { x: offsets[activeSlide]});
  }
}

function sizeIt() {
  // debugger;
  offsets = [];
  iw = slider.offsetWidth;
  gsap.set(container, { width: slides.length * iw });
  gsap.set(slides, { width: iw });
  for (let i = 0; i < slides.length; i++) {
    offsets.push(- (iw * [i]));
  }
  
  gsap.set(container, { x: offsets[activeSlide] });
}

window.addEventListener("resize", sizeIt);
