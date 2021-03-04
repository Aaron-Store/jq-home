(function () {
    $.fn.extend({
        swiper: function (options) {
            var obj = new Swiper(options, this);
            console.log(this.width(), 'sss')
            obj.init();
        }
    })
    function Swiper(options, wrap) {
        this.list = options.list || [];
        this.type = options.type || 'fade';
        this.isAuto = options.isAuto == undefined ? true : options.isAuto;
        this.showChangeBtn = options.showChangeBtn == undefined ? true : options.showChangeBtn;
        this.showSpotsBtn = options.showSpotsBtn == undefined ? true : options.showSpotsBtn;
        this.autoTime = options.autoTime || 3000;
        this.width = options.width || $(wrap).width();
        this.height = options.height || $(wrap).height();
        this.direction = options.direction || 'right';
        this.wrap = wrap || $('body');
        this.num = this.type == 'animate' ? options.list.length + 1 : options.list.length;
        this.nowIndex = 0;
        this.timer = null;
        this.lock = false;
        this.init = function () {
            this.createDom();
            this.initStyle();
            this.bindEvent();
            if (this.isAuto) {
                this.autoChange();
            }
        }
    }
    Swiper.prototype.createDom = function () {
        var swiperDiv = $('<div class="my-swiper"></div>');
        var swiperUl = $('<ul class="my-swiper-list"></ul>')
        var swiperSpots = $('<div class="my-swiper-spots"></div>')
        for (var i = 0; i < this.list.length; i++) {
            var item = this.list[i];
            $('<li class="my-swiper-item"></li>').append(item).appendTo(swiperUl);
            $('<span></span>').appendTo(swiperSpots);
        }
        if (this.type == 'animate') {
            $('<li class="my-swiper-item"></li>').append($(this.list[0]).clone(true)).appendTo(swiperUl);
        }
        swiperDiv
            .append(swiperUl)
            .append(swiperSpots)
            .append($('<div class="my-swiper-btn my-swiper-leftBtn">&lt;</div>'))
            .append($('<div class="my-swiper-btn my-swiper-rightBtn">&gt;</div>'))
            .appendTo(this.wrap)
            .addClass('my-swiper-' + this.type);
    }
    Swiper.prototype.initStyle = function () {
        if (this.type == 'animate') {
            $('.my-swiper-animate > .my-swiper-list', this.wrap).css({
                width: this.num * this.width
            }).find('.my-swiper-item').css({
                width: this.width,
                height: this.height
            });
        } else {
            $('.my-swiper-fade > .my-swiper-list> .my-swiper-item', this.wrap).hide().eq(this.nowIndex).show();
        }
        if (!this.showChangeBtn) {
            $('.my-swiper-btn', this.wrap).hide();
        }
        if (!this.showSpotsBtn) {
            $('.my-swiper-spots', this.wrap).hide();
        }
        $('.my-swiper-spots>span', this.wrap).eq(this.nowIndex).addClass('active');
    }
    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.my-swiper-leftBtn', this.wrap).click(function () {
            if (self.lock) {
                return false;
            }
            self.lock = true;
            if (self.nowIndex == 0) {
                self.nowIndex = self.num - 1;
                if (self.type == 'animate') {
                    $('.my-swiper-list', self.wrap).css({ left: -self.width * (self.num - 1) })
                    // self.nowIndex=;
                    self.nowIndex--;
                }
            } else {
                self.nowIndex--;
            }
            self.change();
        })

        $('.my-swiper-rightBtn', this.wrap).click(function () {
            if (self.lock) {
                return false;
            }
            self.lock = true;
            if (self.nowIndex == self.num - 1) {
                self.nowIndex = 0;
                if (self.type == 'animate') {
                    $('.my-swiper-list', self.wrap).css({ left: 0 })
                    self.nowIndex++;
                }
            } else {
                self.nowIndex++;
            }
            self.change();
        })

        $('.my-swiper-spots>span', this.wrap).mouseenter(function () {
            if (self.lock) {
                return false;
            }
            self.lock = true;
            self.nowIndex = $(this).index();
            self.change();
        })
        $('.my-swiper', this.wrap).mouseenter(function () {
            clearInterval(self.timer);
        }).mouseleave(function () {
            if (self.isAuto) {
                self.autoChange();
            }
        })
    }
    Swiper.prototype.autoChange = function () {
        var self = this;
        this.timer = setInterval(function () {
            if (self.direction == 'right') {
                $('.my-swiper-rightBtn', self.wrap).click();
            } else {
                $('.my-swiper-leftBtn', self.wrap).click();
            }
        }, this.autoTime);
    }
    Swiper.prototype.change = function () {
        var self = this;
        if (this.type == 'fade') {
            $('.my-swiper-item', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function () {
                self.lock = false;
            }
            );
            $('.my-swiper-spots > span', this.wrap).removeClass('active').eq(this.nowIndex).addClass('active');
        } else if (this.type == 'animate') {
            $('.my-swiper-list', this.wrap).animate({ left: -this.width * this.nowIndex }, function () {
                self.lock = false;
            });
            if (this.nowIndex == this.num - 1 && this.type == 'animate') {
                $('.my-swiper-spots > span', this.wrap).removeClass('active').eq(0).addClass('active');
            } else {
                $('.my-swiper-spots > span', this.wrap).removeClass('active').eq(this.nowIndex).addClass('active');
            }
        }
    }
})()