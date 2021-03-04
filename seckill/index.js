(function () {
    countDown();


    function countDown() {
        var timer = setInterval(function () {
            var nowDate = new Date().getTime(),
                seckillDate = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000).getTime();
            // if (seckillDate - nowDate > 0) {
            var hour = Math.floor((seckillDate - nowDate) / 1000 / 60 / 60);
            var minute = Math.floor((seckillDate - nowDate) / 1000 / 60 - hour * 60);
            var second = Math.floor((seckillDate - nowDate) / 1000 - hour * 60 * 60 - minute * 60)
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (second < 10) {
                second = '0' + second;
            }
            console.log(hour, minute, second)
            $('.sec-time-hours').text(hour)
            $('.sec-time-minutes').text(minute)
            $('.sec-time-seconds').text(second)
            // } else {
            //     clearInterval(timer);
            //     countDown();
            // }
        }, 1000)
    }
})()