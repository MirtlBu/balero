const sections = document.querySelectorAll("section");
console.log(sections);

function goToSection(section, anim) {
  gsap.to(window, {
    scrollTo: {y: section, autoKill: false},
    duration: 1
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
    onEnter: () => goToSection(section, intoAnim)
  });

  ScrollTrigger.create({
    trigger: section,
    start: "bottom bottom",
    onEnterBack: () => goToSection(section)
  });

});
////////learn more////////
const features = document.querySelector(".features");
const more = document.querySelector(".features__link");
const back = document.querySelector(".features__back");
const h2 = document.querySelector(".features__h2");
const arrows = document.querySelectorAll(".arrow");
more.addEventListener('click', function(e){
  e.stopPropagation();
    features.classList.contains('features--active') ? features.classList.remove('features--active') : features.classList.add('features--active');
    more.classList.contains('features__link--active') ? more.classList.remove('features__link--active') : more.classList.add('features__link--active');
    back.classList.contains('features__back--active') ? back.classList.remove('features__back--active') : back.classList.add('features__back--active');
    h2.classList.contains('features__h2--active') ? h2.classList.remove('features__h2--active') : h2.classList.add('features__h2--active');
    arrows.forEach(element => {
    element.classList.contains('arrow--active') ? element.classList.remove('arrow--active') : element.classList.add('arrow--active');
  });
});
back.addEventListener('click', function(e){
  e.stopPropagation();
    features.classList.contains('features--active') ? features.classList.remove('features--active') : features.classList.add('features--active');
    more.classList.contains('features__link--active') ? more.classList.remove('features__link--active') : more.classList.add('features__link--active');
    back.classList.contains('features__back--active') ? back.classList.remove('features__back--active') : back.classList.add('features__back--active');
    h2.classList.contains('features__h2--active') ? h2.classList.remove('features__h2--active') : h2.classList.add('features__h2--active');
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
let dur = 1;
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
