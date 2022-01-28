        
    function SwipeCarousel() {
      Carousel.apply(this, arguments)
    }

    SwipeCarousel.prototype = Object.create(Carousel.prototype)

    SwipeCarousel.prototype.constructor = SwipeCarousel;

    SwipeCarousel.prototype._swipeStart = function (e) {
        this.swipeStartX = e.changedTouches[0].pageX;
      }

    SwipeCarousel.prototype._swipeEnd = function (e) {
        this.swipeEndX = e.changedTouches[0].pageX;
        this.swipeStartX - this.swipeEndX < 100 && this.prev();
        this.swipeStartX - this.swipeEndX > -100 && this.next();
      }   
   
    SwipeCarousel.prototype._initListeners = function () {
      Carousel.prototype._initListeners.apply(this);
      this.containter.addEventListener('touchstart', this._swipeStart.bind(this));
      this.containter.addEventListener('touchend', this._swipeEnd.bind(this));
    }