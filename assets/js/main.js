(function () {

const containter = document.querySelector('#carousel');
const slides = containter.querySelectorAll('.slide');
const indicatorsContainer = containter.querySelector('.indicators')
const indicators = containter.querySelectorAll('.indicator');
const pauseBtn = containter.querySelector('#pause-btn');
const prevBtn = containter.querySelector('#prev-btn');
const nextButton = containter.querySelector('#next-btn');

const SLIDES_COUNT = slides.length;
const CODE_LEFT_ARROW = 'ArrowLeft';
const CODE_RIGHT_ARROW = 'ArrowRight';
const CODE_SPASE = 'Space';
const FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
const FA_PLAY = '<i class="fas fa-play-circle"></i>';

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;
let swipeStartX = null;
let swipeEndX = null;

function gotoNth (n) {
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
}

const gotoNext = () => gotoNth(currentSlide + 1);

const gotoPrev = () => gotoNth(currentSlide - 1);

function pause () {
  if(isPlaying){
    clearInterval(timerID);
    pauseBtn.innerHTML = FA_PLAY;
    isPlaying = false;
  }
 }

 function play () {
  timerID = setInterval(gotoNext, interval);
  pauseBtn.innerHTML = FA_PAUSE;
  isPlaying = true;
 }

 const pausePlay = () => isPlaying ? pause() : play();

function next () {
  pause();
  gotoNext();
}

function prev () {
  pause();
  gotoPrev();
  }

  function indicate (e) {
  const target = e.target;

  if (target.classList.contains('indicator')){
    pause();
    gotoNth(+target.getAttribute('data-slide-to'));
    gotoNth(+target.dataset.slideTo);
     };
  }

function pressKey(e) {
  console.log(e)
  if(e.code === CODE_LEFT_ARROW) prev()
  if(e.code === CODE_RIGHT_ARROW) next()
  if(e.code === CODE_SPASE) pausePlay()
 }

const swipeStart = (e) => swipeStartX = e.changedTouches[0].pageX;

  function swipeEnd(e) {
  swipeEndX = e.changedTouches[0].pageX;
  swipeStartX - swipeEndX < 100 && prev();
  swipeStartX - swipeEndX > -100 && next();
  }

function initListeners() {
  pauseBtn.addEventListener('click', pausePlay);
  prevBtn.addEventListener('click', prev);
  nextButton.addEventListener('click', next);
  indicatorsContainer.addEventListener('click', indicate);
  document.addEventListener('keydown', pressKey);
  containter.addEventListener('touchstart', swipeStart)
  containter.addEventListener('touchend', swipeEnd)
}

function init() {
  initListeners();
  timerID = setInterval(gotoNext, interval);
  }

init()

}())
