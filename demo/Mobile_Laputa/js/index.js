/**
 * Created by zhanglei on 16/4/19.
 */
$(function(){

    var main = document.querySelector("#main");
    var oLis = document.querySelectorAll("li");
    var winW = document.documentElement.clientWidth ;//设备的宽
    var winH = document.documentElement.clientHeight;//设备的高
    var desW = 640;
    var desH = 960;
    if(winW/winH<desW/desH){
         main.style.webkitTransform = "scale("+winH/desH+")"
    }else{
        main.style.webkitTransform = "scale("+winW/desW+")"
    }
    var $li=$('#list').find('>li');
    var viewHeight=$(window).height();

    function fnLoad() {
        var arr = ['../img/bg/bg1.jpg', '../img/bg/bg5.jpg', '../img/bg/bg6.jpg', '../img/logo/Laputa_Logo.png',
        '../img/product/laputa2-front.png', '../img/product/laputa2-left.png', '../img/product/laputa2-right.png',
        '../img/bg1.png', '../img/bg31.png', '../img/taobao.png','../img/product/laputa1-left-small.png'];
        var loading = document.querySelector("#loading");
        var process = document.querySelector(".process");
        var n = 0;
        arr.forEach(function () {
            var oImg = new Image();
            oImg.src = "images/" + arguments[0];
            oImg.onload = function () {
                n++;
                process.style.width = n / arr.length * 100 + "%";
                process.addEventListener("webkitTransitionEnd", function () {
                    this.style.webkitTransition = "";
                }, false);
                if (n == arr.length && loading) {
                    window.setTimeout(function () {
                        main.removeChild(loading);
                         onePage($(".page")[0]);
                    }, 1000)
                }
            }
        })
    }
    fnLoad();

    slidePage();
    function slidePage(){
        var nowIndex=0;
        var nextprevIndex=0;
        var step=1/2;
        var bBtn=true;
        $li.on('touchstart',function(ev){
            if(!bBtn) return;
            bBtn=false;
            var touch=ev.originalEvent.changedTouches[0];
            var downY=touch.pageY;
            nowIndex=$(this).index();

            $li.on('touchmove.move',function(ev){
                var touch=ev.originalEvent.changedTouches[0];
                $(this).siblings().hide();
                if(touch.pageY<downY){
                    console.log("sssssss");
                    nextprevIndex=nowIndex==$li.length-1?0:nowIndex+1;
                    $li.eq(nextprevIndex).css('transform','translate(0,'+(viewHeight+touch.pageY-downY)+'px)');
                }else if(touch.pageY>downY){
                    nextprevIndex=nowIndex==0?$li.length-1:nowIndex-1;
                    $li.eq(nextprevIndex).css('transform','translate(0,'+(-viewHeight+touch.pageY-downY)+'px)');
                }else{
                    bBtn=true;
                }
                $(this).css('transform','translate(0,'+(touch.pageY-downY)*step+'px) scale('+(1-Math.abs((touch.pageY-downY))/viewHeight*step)+')');
   
                $li.eq(nextprevIndex).show().addClass('zIndex');
         
                ev.preventDefault();
       
                var ele = $li.eq(nextprevIndex)[0];
                onePage(ele);
                twoPage(ele);
                threePage(ele);
                fourPage(ele);
                fivePage(ele);
            });

            $li.on('touchend.move',function(ev){
                var touch=ev.originalEvent.changedTouches[0];
                if(touch.pageY<downY) {
                    $(this).css('transform','translate(0,'+(-viewHeight*step)+'px) scale('+(1-step)+')');
                }else if(touch.pageY>downY) {
                    $(this).css('transform','translate(0,'+(viewHeight*step)+'px)  scale('+(1-step)+')');
                }else {
                     bBtn=true;
                }
                $(this).css('transition','0.3s');
                $li.eq(nextprevIndex).css('transform','translate(0,0)');
                $li.eq(nextprevIndex).css('transition','.3s');
                $li.off('.move');
            })
        });

        $li.on('transitionEnd webkitTransitionEnd',function(ev){
            if(!$li.is(ev.target)) return;
            resetFn();
        });
        function resetFn(){
            $li.eq(nextprevIndex).removeClass('zIndex').siblings().hide();
            $li.css('transition','');
            bBtn=true;
        }
    }

    function onePage(ele) {
        var pageOne = $(".page")[0];
        var $slogan = $(".slogan p");
        if(ele === pageOne){
            $slogan.each(function(index, el) {  
               if(index %2 == 0){
                     $slogan.addClass('slogan_action_even');
                }else{
                    $slogan.addClass('slogan_action_odd');
                }            
            });
        }else {
            $slogan.each(function(index, el) {
                if(index %2 == 0){
                     $slogan.removeClass('slogan_action_even');
                }else{
                    $slogan.removeClass('slogan_action_odd');
                }
            });
        }
    }

    window.setTimeout(function(){
        onePage($(".page")[0]);
    }, 800);

    function twoPage(ele) {
        var pagetwo = $(".page")[1];
        var $product_front = $(".product_front");
        var $product_left = $(".product_left");
        var $product_right = $(".product_right");
        if(ele === pagetwo){
            $product_front.addClass('product_front_action');
            $product_left.addClass('product_left_action');
            $product_right.addClass('product_right_action');
          
        }else {
            $product_front.removeClass('product_front_action');
            $product_left.removeClass('product_left_action');
            $product_right.removeClass('product_right_action');
        }
    }

    function threePage(ele) {
        var pagethree = $(".page")[2];
        var $slogan = $(".page_three_slogan p");
        if(ele === pagethree){
            $slogan.each(function(index, el) {  
               if(index %2 == 0){
                     $slogan.addClass('slogan_action_even');
                }else{
                    $slogan.addClass('slogan_action_odd');
                }            
            });
        }else {
            $slogan.each(function(index, el) {
                if(index %2 == 0){
                     $slogan.removeClass('slogan_action_even');
                }else{
                    $slogan.removeClass('slogan_action_odd');
                }
            });
        }
    }

    function fourPage(ele) {
        var pagefour = $(".page")[3];
        var $moto = $(".moto");
        if(ele === pagefour){
            $moto.addClass('gam1_action');     
        }else {
            $moto.removeClass('gam1_action');
        }
    }

    function fivePage(ele) {
        var pagefive = $(".page")[4];
        var $soldier = $(".soldier");
        if(ele === pagefive){
            $soldier.addClass('game2_action');     
        }else {
            $soldier.removeClass('game2_action');
        }
    }
})