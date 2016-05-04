;(function(){
    /*标题鼠标触发*/
  var navList = document.getElementById("nav-list").getElementsByTagName("li");
  var navText = document.getElementsByClassName("text");

  var headBl = document.getElementById("headBlock");
  var navBlock = document.getElementsByClassName("sameBlock");
  var navUl = document.getElementById("nav-list");
  var textSp = document.getElementsByClassName("text");

  function raiseHeight(target){
      var timer = null;
      var speed = 2;
      timer = window.setInterval(function(){
        if (parseInt(headBl.style.height) > target ) {
          headBl.style.height = "250px";
          clearInterval(timer);
          timer = null
        }
        else{
          speed += 5;
          headBl.style.height = speed + "px";
        }

      },3)
  }
  function reduceHeight(target){
      var timer = null;
      var speed = 250;
      timer = window.setInterval(function(){
        if (parseInt(headBl.style.height) < target ) {
          clearInterval(timer);
          timer = null
        }
        else{
          speed -= 5;
          headBl.style.height = speed + "px";
        }

      },3)
  }
  var hFlag = 0;
  headBl.style.height =  "0";
  navBlock[1].style.display = "none";
  navBlock[0].style.display = "block";

  for(var i=0; i<navList.length ;i++){
    navList[i].record = i;
    if(navBlock[i] != null ){
      navList[i].addEventListener('mouseenter' , function(){
        for(var i=0; i<navBlock.length; i++){
          navBlock[i].style.display = "none";
          textSp[i].style.color = "#555";
        }
        navBlock[this.record].style.display = "block";
        textSp[this.record].style.color = "#ff6700";
      })
    }
    else{
      navList[i].addEventListener('mouseenter' , function(){
         headBl.style.height = "0"
         for(var i=0; i<navBlock.length; i++){
          textSp[i].style.color = "#555";
        }
      })
    }
  }

  navUl.addEventListener('mouseenter',function(e){
      hFlag = 0;
      if(headBl.style.height == "250px"){
        headBl.style.height = "250px"
      }
      else{
         raiseHeight(250);
      }
  });

  navUl.addEventListener('mouseleave',function(e){
      window.setTimeout(
        function(){
         if(headBl.style.height == "250px" && hFlag == 0)
          {
            reduceHeight(0);
            for(var i=0; i<navBlock.length; i++){
              navBlock[i].style.display = "none";
              textSp[i].style.color = "#555";
            }
          }
        },300);
  });

  headBl.addEventListener('mouseenter',function(e){
      hFlag = 1;
      if(headBl.style.height != "250px")
      {
      }
      else{
        headBl.style.height = "250px";
      }
      
  });

  headBl.addEventListener('mouseleave',function(){
      window.setTimeout(
      function(){
       if(headBl.style.height == "250px" && hFlag == 1)
        {
          reduceHeight(0);
          for(var i=0; i<navBlock.length; i++){
            navBlock[i].style.display = "none";
            textSp[i].style.color = "#555";
          }
        }
      },500);
  });
})();

;(function(){
    /*搜索*/
  var oSearch = document.getElementById("serchContext");
  var inputSearch = document.getElementById("serch-text");
  var searchBtn = document.getElementsByClassName("search-btn")[0];
  var oUl = document.getElementsByClassName('serchUl')[0];

  inputSearch.addEventListener('keyup', function(){
    if(this.value){
      inputSearch.style.borderColor = "#ff6700";
      searchBtn.style.borderColor = "#ff6700";
      jsonp('http://search.mi.com/search/expand', 
           {keyword: this.value},
           'jsonpcallback',
           function(data){
              oUl.innerHTML = "";
              if(data.length === 0 ){
                oSearch.style.display = "none";
                return;
              }
              oSearch.style.display = "block";
              for(var i=0; i<data.length; i++) {
                var li = document.createElement('li');
                for(var str in data[i]){
                  var span = document.createElement('span');
                  if(str === 'Key'){
                    li.targetData = data[i][str];
                    span.innerHTML = data[i][str];
                    span.targetData = data[i][str];
                    li.appendChild(span);
                    oUl.onclick = function(e){
                      console.log(e.target);
                      window.open('http://search.mi.com/search_'+e.target.targetData, '_blank');
                      oSearch.style.display = "none";
                      inputSearch.style.borderColor = "#B8B5B5";
                      searchBtn.style.borderColor = "#B8B5B5";
                    }
                  }else {
                    span.innerHTML = "约有"+data[i][str]+"件";
                    span.className = "";
                    li.appendChild(span);
                  }
                }
                oUl.appendChild(li);
              }
           });
    }else {
      oSearch.style.display = "none";
      inputSearch.style.borderColor = "#B8B5B5";
      searchBtn.style.borderColor = "#B8B5B5";
    }
  });

  searchBtn.addEventListener('click', function(){
      if(inputSearch.value){
         window.open('http://search.mi.com/search_'+inputSearch.value, '_blank');
         oSearch.style.display = "none";
         inputSearch.style.borderColor = "#B8B5B5";
         searchBtn.style.borderColor = "#B8B5B5";
      }
  }, false);
})();

 /*图片切换*/
;(function(){
  var oImg = document.getElementById("home-picture").getElementsByTagName("img")[0];
  var oSelectPic = document.getElementById("selectPic").getElementsByTagName("div");
  var imgUrl = ["picture/T1nNLgBmJv1RXrhCrK.jpg","picture/T1_rZgB4xv1RXrhCrK.jpg","picture/T1SXLQByhv1RXrhCrK.jpg" , "picture/T1K_DgB4Lv1RXrhCrK.jpg","picture/T1g5hgBmKv1RXrhCrK.jpg"];
  oImg.src = imgUrl[2];
  oSelectPic[2].style.background = '#BFBFBF';
  oSelectPic[2].style.borderColor = '#666';
  var clickTime=2;
  var directonFlag = 0;

  var timerPicRaise = null;
  var timerPicReduce = null;
  var alpha=0;
  var speed = 2;

  function opacityRaise(target){
    if(alpha<target){
        alpha = alpha + speed;
        oImg.style.opacity = alpha/100;
        timerPicRaise = window.setTimeout(function(){opacityRaise(target)}, 30);
    }
    else{
        window.setTimeout(function(){
          alpha = 100;
          opacityReduce(70);
        },5000);
    }
  }

  var timerFlag = 0;
  function opacityReduce(target){
    if(alpha>target){
        alpha = alpha - speed;
        oImg.style.opacity = alpha/100;
        window.setTimeout(function(){opacityReduce(target)}, 10);
    }
    else{
          pictureAutoChange();
          alpha = 70;
          opacityRaise(100);
    }
  }

  alpha = 100;
  opacityReduce(60);

  function pictureAutoChange(){

    clickTime++;
    if(clickTime > 4)
      clickTime=0;
    oImg.src=imgUrl[clickTime];
    
    for(var j=0; j<5; j++){
      oSelectPic[j].style.background = '#666';
      oSelectPic[j].style.borderColor = '#BFBFBF';
    }
    oSelectPic[clickTime].style.background = '#BFBFBF';
    oSelectPic[clickTime].style.borderColor = '#666';
  }

  for(var i=0; i<5; i++){
    ~(function(i){
        oSelectPic[i].onclick = function(){
        oImg.src = imgUrl[i];
        for(var j=0; j<5; j++){
          oSelectPic[j].style.background = '#666';
          oSelectPic[j].style.borderColor = '#BFBFBF';
        }
        oSelectPic[i].style.background = '#BFBFBF';
        oSelectPic[i].style.borderColor = '#666';
        clickTime=i;
      }
    })(i)
  }
  var oLeftS=document.getElementById('leftS');
  var rightS=document.getElementById('rightS');

  oLeftS.onclick = function(){
    if(--clickTime < 0)
        clickTime=4;
    oImg.src=imgUrl[clickTime];
    for(var j=0; j<5; j++){
      oSelectPic[j].style.background = '#666';
      oSelectPic[j].style.borderColor = '#BFBFBF';
    }
    oSelectPic[clickTime].style.background = '#BFBFBF';
    oSelectPic[clickTime].style.borderColor = '#666';
  }
  rightS.onclick = function(){
    if(++clickTime > 4)
        clickTime=0;
     oImg.src=imgUrl[clickTime];
    for(var j=0; j<5; j++){
      oSelectPic[j].style.background = '#666';
      oSelectPic[j].style.borderColor = '#BFBFBF';
    }
    oSelectPic[clickTime].style.background = '#BFBFBF';
    oSelectPic[clickTime].style.borderColor = '#666';
  }
})();

  /*小米商品动画*/
;(function(){
  var oList = document.getElementById("someshop");
  var goodsSelectLeft = document.getElementById("sL");
  var goodsSelectRight = document.getElementById("sR");

  var leftDistance = 0;
  var time = 2;
  var timer = null;
  var moveFlag = 0;
  function moveleft(){
    if(leftDistance < 1240){
        leftDistance += 10;
        oList.style.left = -leftDistance + 'px';
        window.setTimeout(arguments.callee, 1);
        moveFlag = 0;
    } else {
    goodsSelectRight.style.background = "#ddd";
    goodsSelectLeft.style.background = "#777";
     timer = window.setTimeout(function(){moveright()}, 5000);
    }
    
  }


  function moveright(){
    if(leftDistance >0){
      leftDistance -=10;
      oList.style.left = -leftDistance + 'px';
       window.setTimeout(arguments.callee, 1);
       moveFlag = 1;
    } else {
      goodsSelectRight.style.background = "#777";
      goodsSelectLeft.style.background = "#ddd";
      timer = window.setTimeout(function(){moveleft()}, 5000);
    }

  }
  moveleft();

  goodsSelectLeft.onclick = function(){
    if ((this.style.background == "rgb(221, 221, 221)") && (oList.style.left == "0px"))  {
      window.clearTimeout(timer);
      timer = null;
      moveleft();
    }

  }

  goodsSelectRight.onclick = function(){
    if ((this.style.background == "rgb(221, 221, 221)") && (oList.style.left == "-1240px")){
      window.clearTimeout(timer);
      timer = null;
      moveright();
    }
      
  }

  oList.addEventListener('mouseenter', function(){
      window.clearTimeout(timer);
      timer = null;
  })

  oList.addEventListener('mouseleave', function(){
    if(moveFlag == 0)
      moveleft();
    else
      moveright();
  })
})();

 /*搭配鼠标选择功能*/
;(function(){
  var oHdSelctLis = document.getElementById("hdSelect").getElementsByTagName('li');
  var partThree = document.getElementById("threePart");
  var partFour = document.getElementById("fourPart");
  var partFive = document.getElementById("fivePart");
  var partS = [partThree, partFour, partFive];

  var selectSome = document.getElementById("hdSelect").getElementsByTagName("li");

  partFour.style.display = "none";
  partFive.style.display = "none";
  selectSome[0].style.color = "#ff6700";
  selectSome[0].style.borderBottom = "2px solid #ff6700"

  oHdSelctLis[0].addEventListener("mouseenter", function(){
      partThree.style.display = "block";
      partFour.style.display = "none";
      partFive.style.display = "none";
      for(var j=0; j<3; j++){
        selectSome[j].style.color = "#555";
        selectSome[j].style.borderBottom = "none"
      }
      selectSome[0].style.color = "#ff6700";
      selectSome[0].style.borderBottom = "2px solid #ff6700";
  })
  oHdSelctLis[1].addEventListener("mouseenter", function(){
      partThree.style.display = "none";
      partFour.style.display = "block";
      partFive.style.display = "none";
      for(var j=0; j<3; j++){
        selectSome[j].style.color = "#555";
        selectSome[j].style.borderBottom = "none"
      }
      selectSome[1].style.color = "#ff6700";
      selectSome[1].style.borderBottom = "2px solid #ff6700";
  })
  oHdSelctLis[2].addEventListener("mouseenter", function(){
      partThree.style.display = "none";
      partFour.style.display = "none";
      partFive.style.display = "block";
      for(var j=0; j<3; j++){
        selectSome[j].style.color = "#555";
        selectSome[j].style.borderBottom = "none"
      }
      selectSome[2].style.color = "#ff6700";
      selectSome[2].style.borderBottom = "2px solid #ff6700";
  })
})();

;(function(){
  var videoBtn = document.getElementsByClassName('selVideo');
  var no = document.getElementsByClassName('no');
  var cover = document.getElementsByClassName('cover')[0];
  var video = document.getElementsByClassName('video-one');
  for(var i=0; i<videoBtn.length; i++){
    videoBtn[i].record = i;
    video[i].record = i;
    no[i].record = i;
    videoBtn[i].onclick = function(){
      var _this = this;
      cover.style.display = 'block';
      video[this.record].style.display = 'block';
      window.setTimeout(function(){
          video[_this.record].className = "video-one video-ani";
      }, 300);
    }
    no[i].onclick = function(){
      cover.style.display = 'none';
      video[this.record].style.display = 'none';
      video[this.record].className = "video-one";
    }

  }

  // videoBtn[0].onclick = function(){
  //   cover.style.display = 'block';
  //   video[0].style.display = 'block';
  //   window.setTimeout(function(){
  //     video[0].className = "video-one video-ani";
  //   }, 300);
  // }
  // no[0].onclick = function(){
  //   cover.style.display = 'none';
  //   video[0].style.display = 'none';
  //   video[0].className = "video-one";
  // }
})();
