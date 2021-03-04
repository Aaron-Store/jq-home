function getSearchListData(val) {
    $.ajax({
        url: 'https://suggest.taobao.com/sug',
        type: 'get',
        data: {
            area: 'c2c',
            code: 'utf-8',
            q: val,
            callback: "renderDom"
        },
        dataType: 'jsonp'
    })
}

$('.search-input').on('input', function () {
    var val = $(this).val();
    if (val) {
        // console.log(this.timer)
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            getSearchListData(val);
        }, 500)
    }
})

function renderDom(res) {
    var data = res.result,
        str = '';
    console.log(data);
    data.forEach(function (item) {
        str += `<li><a href="#">${item[0]}</a><li>`
    });
    str += `<li class="search-list-close">关闭</li>`;
    $('.search-list').html(str).show();
    $('.search-list-close').click(function () {
        $('.search-list').hide();
    })
}

$('.search-box').mouseleave(function () {
    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
        $('.search-list').hide();
    }, 1000);
})

$('.logo').mouseenter(function () {
    $('.logo-img').css({
        backgroundImage: 'url(https://img1.360buyimg.com/da/jfs/t1/16134/5/11584/77878/5c90a4bdE5ae12937/38714fb6679b8daf.gif?v=' + Math.random() + ')'
    }).show();
}).mouseleave(function () {
    setTimeout(function () {
        $('.logo-img').hide();
    }, 1000)
})


$('.search-btn').click(function () {
    console.log('跳转页面')
})