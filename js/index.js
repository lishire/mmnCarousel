/**
 * Created by Administrator on 2017/9/6.
 */
window.onload=function(){
    var content = document.getElementsByClassName("carousel")[0];
    var config = content.getAttribute("data-carousel");
    var a = JSON.parse(config);
    var imgSrc = a.src;             //["01.jpg","02.jpg","03.jpg"]
    var environment = a.config;     //{"width":500,"height":320}
    var current_idx;
    /*大容器初始化*/
    if(environment.width!=null||environment.width!=undefined){
        content.style.width = environment.width+"px";
    }else{
        content.style.width = 500+"px";
    }
    if(environment.height!=null||environment.height!=undefined){
        content.style.height = environment.height+"px";
    }else{
        content.style.height = 500+"px";
    }
    var con_width = parseInt(content.style.width);
    var con_height = parseInt(content.style.height);
    content.style.overflow = "hidden";
    /*生成装图片的容器*/
    var list = document.createElement("div");
    list.style.width = con_width*imgSrc.length+"px";
    list.style.height = con_height+"px";
    list.style.position = " relative";
    list.style.left = 0;
    list.style.transition = "all .5s ease-in-out";
    content.appendChild(list);
    var left_val = parseInt(list.style.left);
    for(var i=0;i<imgSrc.length;i++){
        list.appendChild(document.createElement("img")) ;
    }
    var img = document.getElementsByTagName("img");
    for(var j=0;j<img.length;j++){
        for(var k=0;k<img.length;k++){
            if(j===k){
                img[k].src = imgSrc[k]
            }
        }
    }

    /*生成箭头的DIV*/
    var arrow = document.createElement("div");
    arrow.style.width = con_width+"px";
    arrow.style.height = 50 +"px";
    arrow.style.position = "relative";
    arrow.style.top = -(con_height /2+50) +"px";
    content.appendChild(arrow);

    /*生成箭头*/
    var next = document.createElement("span");
    var prev = document.createElement("span");
    next.innerText = ">";
    prev.innerText = "<";
    next.style.fontSize = "60px";
    prev.style.fontSize = "60px";
    next.style.float = "right";
    arrow.appendChild(prev);
    arrow.appendChild(next);

    function moving(speed,terminal,flag){
        if(left_val===terminal){
            left_val=flag;
        }else{
            left_val += speed;
        }
        list.style.left=left_val+"px";
        for (var j = 0; j < btn.length; j++) {
            btn[j].setAttribute("class", "")
        }
        btn[Math.abs(left_val/con_width)].setAttribute("class", "on")
    }
    next.addEventListener("click",function(){
        moving(-con_width,-con_width*(imgSrc.length-1),0)
    });
    prev.addEventListener("click",function(){
        moving(con_width,0,-con_width*(imgSrc.length-1))
    });

    var btn_list = document.createElement("div");
    btn_list.className = "btn_list";
    btn_list.style.left = (con_width)/2-30 +"px";

    for(var b=0;b<imgSrc.length;b++){
        btn_list.appendChild(document.createElement("span")) ;
    }
    content.appendChild(btn_list);
    var btn = document.getElementsByClassName("btn_list")[0].getElementsByTagName("span");
    btn[0].className = "on";
    for (var e = 0; e < btn.length; e++) {
        (function (n) {
            btn[n].addEventListener("click", function () {
                left_val = n * (-con_width);
                list.style.left =left_val + "px";
                for (var j = 0; j < btn.length; j++) {
                    btn[j].setAttribute("class", "")
                }
                btn[n].setAttribute("class", "on");
                current_idx = n;
            })
        })(e)
    }
    content.timer = setInterval(function () {
        moving(-con_width,-con_width*(imgSrc.length-1),0)
    }, 2000);
    content.onmouseover = function () {
        clearInterval(content.timer);
    };
    content.onmouseout = function () {
        clearInterval(content.timer);
        content.timer = setInterval(function () {
            moving(-con_width,-con_width*(imgSrc.length-1),0)
        }, 2000);
    };
};