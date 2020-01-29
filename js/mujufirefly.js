$(function() {

    // 녹색 반딧불 효과
    $.firefly({
      total: 40,
      ofTop: 0,
      ofLeft: 0,
      on: '#firefly1', 
      twinkle: 0.2, 
      minPixel: 2,
      maxPixel: 5,
      color: '#89c240',
      namespace: 'jqueryFireFly', 
      zIndex: Math.ceil(Math.random() * 20) - 1,
      borderRadius: '50%',
      _paused: false
    });
    // 흰색 반딧불 효과
    $.fireflyTwo();
    
    // main-video 버튼 바꾸기
    var player=$('video')[0];
    
    $('.article1 button').click(function(e) {
      e.preventDefault();
      if(player.paused) {//플레이 상태면
        player.play();
        $(this).find('i').toggleClass('fa-pause-circle fa-play-circle');
      }else{
        player.pause();
        $(this).find('i').toggleClass('fa-play-circle fa-pause-circle');
      }
    })

    // 낮 프로그램 슬라이드
    var programSwiperOption={
      slidesPerView: 3,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      }
    }
    var programSwiper = new Swiper('.program-am',programSwiperOption);

    $(window).resize(function() {
      var winWidth = $(window).width();
      $('.gnb').off('mouseenter mouseleave');

      //swiper 초기화
      if(programSwiper!=undefined){
        programSwiper.destroy();
      }

      if(winWidth>=1200){//pc
        // nav의 네비게이션에 hover시 변경되는 점
        $('.gnb').on({
          mouseenter:function () { 
            $('body').addClass('nav-open');
            $(this).parents('header').find('.gnb-bg').stop(true).slideDown();
            player.pause();
            $('.article1 button i').removeClass('fa-pause-circle').addClass('fa-play-circle');
          },
          mouseleave:function () { 
            $('body').removeClass();
            $(this).parents('header').find('.gnb-bg').stop(true).slideUp();
          }
        })       
      }
      
      if(winWidth>750){//태블릿
        programSwiper = new Swiper('.program-am',programSwiperOption);
      }
    }).resize();
    
      // 공지 슬라이드
      function move() {
          // 공지 리스트를 움직이는 함수
          $('.notice-anounce').stop(true).animate({
              'margin-top':-50
          },function() {//다음처리는 애니메이션 효과가 없다.
            // 애니메이션이 종료된 후 첫번째 리스트를 마지막 위치로 이동
            $('.notice-anounce li').first().appendTo('.notice-anounce');
            // ul의 상태를 초기화 해야한다. margin-top을 0으로 변경
            $('.notice-anounce').css('margin-top',0);
          })
      } 

      // 2.5초마다 move함수를 실행하도록 한다.
      var play=setInterval(move,2500);

      // ul영역에 마우스를 올리면 멈추고 벗어나면 다시 실행
      $('.notice-anounce').on({
        mouseenter:function(){
            clearInterval(play);
        },
        mouseleave:function(){
            play=setInterval(move, 2500);
        }
      })

      // 로그인 팝업창 여는 것
      $('.user_btn, header .m-user-btn').click(function() {
        if($(this).hasClass('active')!=true){
          $('.user_btn, header .m-user-btn').removeClass('active');
          $(this).addClass('active');
          $('.user-login-popup').show();
        }
      })

      $('.btn-login-close').click(function(){
        $('.user_btn, header .m-user-btn').removeClass('active');
        $('.user-login-popup').hide();
      })
      

      // 언어 팝업창 열기
      $('.lang').click(function() {
        $(this).find('ul').slideToggle();
      })

      // 언어 변경하기
      $('.lang ul li a').click(function(e){
        e.stopPropagation();
        var langSelect=$(this).text();
        var langClass=$(this).find('span').attr('class');
        $('.lang>a>span:nth-child(1) i').attr('class',langClass);
        $('.lang>a>span:nth-child(2)').text(langSelect);
        $('.lang ul').slideUp();
      })

      // 메뉴 슬라이드(태블릿, 모바일)
      $('.menu-btn').click(function(){
        var btnText=$(this).find('i').text();
        if(btnText=='menu'){
          $(this).addClass('active');
          $(this).nextAll('nav').addClass('active');
          $(this).find('i').text('clear');
        }else if (btnText=='clear') {
          $(this).removeClass('active');
          $(this).nextAll('nav').removeClass('active');
          $(this).find('i').text('menu');
        }
      })

      
})