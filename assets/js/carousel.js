function Carousel() {
  this.containter = document.querySelector('#carousel');
  this.slides = this.containter.querySelectorAll('.slide');
  this.indicatorsContainer = this.containter.querySelector('.indicators')
  this.indicators = this.containter.querySelectorAll('.indicator');
  this.pauseBtn = this.containter.querySelector('#pause-btn');
  this.prevBtn = this.containter.querySelector('#prev-btn');
  this.nextButton = this.containter.querySelector('#next-btn');
  
  this.SLIDES_COUNT = this.slides.length;
  this.CODE_LEFT_ARROW = 'ArrowLeft';
  this.CODE_RIGHT_ARROW = 'ArrowRight';
  this.CODE_SPASE = 'Space';
  this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
  
  this.currentSlide = 0;
  this.isPlaying = true;
  this.timerID = null;
  this.interval = 2000;
  this.swipeStartX = null;
  this.swipeEndX = null;
}

Carousel.prototype = {

    gotoNth (n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        },
      
    gotoNext () {
        this.gotoNth(this.currentSlide + 1);
        },
    
    gotoPrev () {
        this.gotoNth(this.currentSlide - 1);
        },

    pause () {
        if(this.isPlaying){
        clearInterval(this.timerID);
        this.pauseBtn.innerHTML = this.FA_PLAY;
        this.isPlaying = false;
        }},
        
    play () {
      this.timerID = setInterval(this.gotoNext, this.interval);
      this.pauseBtn.innerHTML = this.FA_PAUSE;
      this.isPlaying = true;
     },
        
    pausePlay () {
      this.isPlaying ? this.pause() : this.play();
       },
        
    next () {
      this.pause();
      this.gotoNext();
       },
      
    prev () {
      this.pause();
      this.gotoPrev();
        },
      
    indicate (e) {
        this.target = e.target;
    
      if (this.target.classList.contains('indicator')){
        this.pause();
        this.gotoNth(+this.target.getAttribute('data-slide-to'));
       };
      },
    
    pressKey(e) {
        if(e.code === this.CODE_LEFT_ARROW) this.prev();
        if(e.code === this.CODE_RIGHT_ARROW) this.next();
        if(e.code === this.CODE_SPASE) this.pausePlay();
      },
    
    swipeStart (e){
      this.swipeStartX = e.changedTouches[0].pageX;
      }, 
    
    swipeEnd(e) {
      this.swipeEndX = e.changedTouches[0].pageX;
      this.swipeStartX - this.swipeEndX < 100 && this.prev();
      this.swipeStartX - this.swipeEndX > -100 && this.next();
        },
    
    initListeners() {
      this.pauseBtn.addEventListener('click', this.pausePlay);
      this.prevBtn.addEventListener('click', this.prev);
      this.nextButton.addEventListener('click', this.next);
      this.indicatorsContainer.addEventListener('click', this.indicate);
      this.containter.addEventListener('touchstart', this.swipeStart)
      this.containter.addEventListener('touchend', this.swipeEnd)
      document.addEventListener('keydown', this.pressKey);
      },
    
    init() {
      this.initListeners();
      this.timerID = setInterval(this.gotoNext, this.interval);
      },
    };

    Carousel.prototype.constructor = Carousel;


  