        
    class SwipeCarousel extends Carousel{
    
    _swipeStart (e) {
      this.swipeStartX = e.changedTouches[0].pageX;
    };

    _swipeEnd (e) {
      this.swipeEndX = e.changedTouches[0].pageX;
      this.swipeStartX - this.swipeEndX < -100 && this.prev();
      this.swipeStartX - this.swipeEndX > 100 && this.next();
    };  

    _initListeners() {
      super._initListeners.apply(this);
      this.container.addEventListener('touchstart', this._swipeStart.bind(this))
      this.container.addEventListener('touchstart', this._swipeEnd.bind(this))
    };
    };



 
   
 