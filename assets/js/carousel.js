function Carousel() {
  this.containter = document.querySelector('#carousel');
  this.slides = this.containter.querySelectorAll('.slide');
  this.indicatorsContainer = this.containter.querySelector('.indicators')
  this.indicators = this.containter.querySelectorAll('.indicator');
  this.pauseBtn = this.containter.querySelector('#pause-btn');
  this.prevBtn = this.containter.querySelector('#prev-btn');
  this.nextButton = this.containter.querySelector('#next-btn');
  

}

Carousel.prototype = {
    _initProps(){
      this.SLIDES_COUNT = this.slides.length;
      this.CODE_LEFT_ARROW = 'ArrowLeft';
      this.CODE_RIGHT_ARROW = 'ArrowRight';
      this.CODE_SPASE = 'Space';
      this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
      this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
      
      this.currentSlide = 0;
      this.isPlaying = true;
      this.interval = 2000;
    },

    _initListeners() {
      this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
      this.prevBtn.addEventListener('click', this.prev.bind(this));
      this.nextButton.addEventListener('click', this.next.bind(this));
      this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
      document.addEventListener('keydown', this._pressKey.bind(this));
    },

    _gotoNth(n) {
      this.slides[this.currentSlide].classList.toggle('active');
      this.indicators[this.currentSlide].classList.toggle('active');
      this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
      this.slides[this.currentSlide].classList.toggle('active');
      this.indicators[this.currentSlide].classList.toggle('active');
    },
              
    _gotoNext() {
      this._gotoNth(this.currentSlide + 1);
    },
            
    _gotoPrev() {
      this._gotoNth(this.currentSlide - 1);
    },
        
    _pause() {
      if(this.isPlaying){
      clearInterval(this.timerID);
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
    }
  },
                
    _play() {
      this.timerID = setInterval(() => this._gotoNext(), this.interval);
      this.pauseBtn.innerHTML = this.FA_PAUSE;
      this.isPlaying = true;
    },
        
    _indicate (e) {
      this.target = e.target;
          
      if (this.target.classList.contains('indicator')){
      this._pause();
      this._gotoNth(+this.target.dataset.slideTo);
    };
  },
          
    _pressKey(e) {
      if(e.code === this.CODE_LEFT_ARROW) this.prev();
      if(e.code === this.CODE_RIGHT_ARROW) this.next();
      if(e.code === this.CODE_SPASE) this.pausePlay();
    },
              
    pausePlay() {
      this.isPlaying ? this._pause() : this._play();
    },
        
    next() {
      this._pause();
      this._gotoNext();
    },
              
    prev() {
      this._pause();
      this._gotoPrev();
    },

    init() {
      this._initProps();
      this._initListeners();

      this.timerID = setInterval( () => this._gotoNext(), this.interval); //or =>
      // this.timerID = setInterval(this.gotoNext.bind(this), this.interval);  - restabilirea contextului pentru setInterva, setTimeout
      },
    };

    Carousel.prototype.constructor = Carousel;
    