


$.ajax({
    type: "GET",
    url: "https://www.yuyucode.com/duyi/jd/module/content/areaWrapper.js",
    dataType: "jsonp"
})

var fs1Data = null;
function areaWrapper(data) {
    fs1Data = data.result;
}


$('.fs1').on('mouseenter', '.menu-item', function (e) {
    renderPopDom($(this).data('index'));
    $('.menu-pop').show();
}).on('mouseleave', function (e) {
    $('.menu-pop').hide();
});


function renderPopDom(index) {
    var itemData = fs1Data[index];
    renderImg(itemData.data.image);
    renderTitle(itemData.data.title);
    renderContent(itemData.data.content);
    // content
    function renderContent(content) {
        var str = '';
        content.forEach(function (item) {
            var ddsDomStr = '';
            item.data.forEach(function (item) {
                ddsDomStr += ` <dd><a href="">${item}</a></dd>`;
            })

            var dlStr = `<dl> 
            <dt><a href="#">${item.title}<i class="iconfont">&#xe743;</i></a></dt>
                                 ${ddsDomStr}
                           </dl>`;
            str += dlStr;
        })

        $('.detail').html(str);
    }
    // title
    function renderTitle(title) {
        var titleStr = '';
        title.forEach(function (item) {
            titleStr += `<a href="">${item}<i class="iconfont">&#xe743;</i></a>`;
        })
        $('.channel').html(titleStr);
    }
    // imgs
    function renderImg(imgs) {
        var bigsStr = '';
        imgs.big.forEach(function (item) {
            bigsStr += `<a href="#"> <img src="${item}"></a>`;
        });
        var smallsStr = '';
        imgs.small.forEach(function (item) {
            smallsStr += `<a href="#"> <img src="${item}"></a>`;
        });
        $('.img-big').html(bigsStr);
        $('.img-list').html(smallsStr);
    }
}


$('.fs2-left').swiper({
    list: $('.fs2-left-img'),
    type: 'fade',
    isAuto: true,
    showSpotsBtn: true,
    showChangeBtn: true,
    autoTime: 2000,
    width: 590,
    height: 480,
    direction: 'right'
})


$('.fs2-right').swiper({
    list: $('.fs2-right-imgs'),
    type: 'fade',
    isAuto: false,
    showSpotsBtn: false,
    showChangeBtn: true,
    autoTime: 2000,
    direction: 'right'
})



// fs3 service  
$('.service_item').mouseenter(function (e) {
    if ($(this).index() > 3) {
        return;
    }
    $('.service-expand').show().find('.content').html($(this).html().trim());

})
$('.service-expand .expend-close').click(function () {
    $('.service-expand').hide();
})