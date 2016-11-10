	
	// 类名获取函数兼容处理
function byClass(oClass){//全局获取
	var tags=document.all?document.all:document.getElementsByTagName('*');
	var arr=[];
	var reg=new RegExp('\\b'+oClass+'\\b');
	for (var i = 0; i < tags.length; i++) {
		// var reg=new RegExp('\\b'+oClass+'\\b','g');
		reg.lastIndex=0;
		if (reg.test(tags[i].className)) {
		arr.push(tags[i]);
		};
	};
	return arr;
}
// ***************右侧导航栏*************
	$(function (){
		$('.tbar_box').mouseover(function (){
			var i=$(this).index();
			$('.tbar_box i').eq(i).css({backgroundColor:'#C81623'});
			$('.tbar_box em').eq(i).css({backgroundColor:'#C81623'});
			$('.tbar_box em').eq(i).stop().animate({left:'-49px'},400);
		});

			$('.tbar_box').mouseout(function (){
			var i=$(this).index();
			$('.tbar_box i').eq(i).css({backgroundColor:'#7a6e6e'});
			// $('.tbar_box .tabs_tip').css({display:'blcok'});
			$('.tbar_box em').eq(i).css({backgroundColor:'#7a6e6e'});
			$('.tbar_box em').eq(i).stop().animate({left:'35px'},400);
		});

			$('.tbar_footer_top').click(function (){
				$('body').animate({scrollTop:'0'},500);
			})
			$('.tabs_box').mouseover(function (){
				var i=$(this).index();
				$('.tabs_box .tabs_ico').eq(i).css({backgroundColor:'#C81623'});
				$('.tabs_box em').eq(i).css({backgroundColor:'#C81623'});
				$('.tabs_box em').eq(i).stop().animate({left:'-66px'},400);
			})

			$('.tabs_box').mouseout(function (){
				var i=$(this).index();
				$('.tabs_box .tabs_ico').eq(i).css({backgroundColor:'#7a6e6e'});
				$('.tabs_box em').eq(i).css({backgroundColor:'#7a6e6e'});
				$('.tabs_box em').eq(i).stop().animate({left:'35px'},400);
			})

	})
	// ***********左侧楼层导航*********
 leftroll();
    function leftroll() {
        var allnav = document.getElementById('allnav');
        var alls = allnav.getElementsByTagName('li');
        var alli = allnav.getElementsByTagName('i');
        var t = 0;
        for (var i = 0; i < alls.length; i++) {
            alls[i].onmouseover = function () {
                for (var j = 0; j < alls.length; j++) {
                    if (this == alls[j]) {
                        alls[j].className = "show";
                        alli[j].className = "now";
                    }
                    else {
                        alls[j].className = "";
                        alli[j].className = "";
                    }
                    if (j == t) {
                        alls[t].className = "show2";
                        alli[t].className = "now";

                    }
                }
            }
        }
        allnav.onmouseout = function () {
            for (var j = 0; j < alls.length; j++) {
                if (alls[j].className !== "show2") {
                    alls[j].className = "";
                    alli[j].className = "";
                } else {
                    alls[t].className = "show2";
                    alli[t].className = "now";
                }
            }
        };
        var time11 = null;
        var floor = byClass("wfloor");
        var kl = 0;
        //对应楼层滚动
        window.onscroll = function () {
            var stt = document.documentElement.scrollTop || document.body.scrollTop;
            if ((stt > floor[0].offsetTop - 300) && (stt <= floor[11].offsetTop + 500)) {
                allnav.style.display = "block";
                for (var i = 0; i < floor.length; i++) {
                    if (stt > floor[i].offsetTop - 300) {
                        t = i;
                    }
                    alls[i].className = "";
                    alli[i].className = "";
                }
                alls[t].className = "show2";
                alli[t].className = "now";
                for (var l = 0; l < alls.length; l++) {
                    alls[l].onclick = function () {
                        for (var j = 0; j < alls.length; j++) {
                            if (this == alls[j]) {
                                kl = j;
                                time11 = setInterval(function () {
                                    if (stt < floor[kl].offsetTop) {
                                        stt += 100;
                                        document.documentElement.scrollTop = stt;
                                        document.body.scrollTop = stt;
                                        if (stt >= floor[kl].offsetTop) {
                                            clearInterval(time11);
                                            document.documentElement.scrollTop =floor[kl].offsetTop ;
                                            document.body.scrollTop = floor[kl].offsetTop;
                                        }
                                    } else {
                                        stt -= 100;
                                        document.documentElement.scrollTop = stt;
                                        document.body.scrollTop = stt;
                                        if (stt <= floor[kl].offsetTop) {
                                            clearInterval(time11);
                                            document.documentElement.scrollTop =floor[kl].offsetTop ;
                                            document.body.scrollTop = floor[kl].offsetTop;
                                        }
                                    }
                                }, 1);
                            }
                        }
                    }
                }
            }
            else {
                allnav.style.display = "";
            }
        };
    }
	// **********头部******************
var header=document.getElementById('header');
	// **************城市选择start***********
var city=document.getElementById('city');
var area=document.getElementById('area');
var show=document.getElementById('show');
var list=document.getElementById('list');
var as=list.getElementsByTagName('a');
city.onmouseover=function (ev){
		var e=ev||window.event;
		var target=e.target||e.srcElement;
		var from=e.relatedTarget||e.fromElement;
		while(from){
			if (from==this) {
				return false;
			};
			from=from.parentNode;
		}
		if (target.id=='area') {
			list.style.display='block';
			area.style.background='#fff';
			area.style.borderLeft='1px solid #ccc';
			area.style.borderRight='1px solid #ccc';
			};
	}
	// console.log(as.length);
header.onclick=function (ev){
		var ev=ev||window.event;
		var target=ev.target||ev.srcElement;
		for (var i = 0; i < as.length; i++) {
			as[i].className='';
			if (target.nodeName=='A'&&target.parentNode.parentNode.id=='list') {
				show.innerHTML=target.innerHTML+'∧';
				target.className='select';
				list.style.display='none';
			};

		}
	}
city.onmouseleave=function (){
		list.style.display='none';
		area.style.background='#F1F1F1';
		area.style.borderLeft='1px solid transparent';
		area.style.borderRight='1px solid transparent';
	}
	//****************城市选择end************
	//****************我的京东start************
	var my=document.getElementById("my");
	var my_box=document.getElementById('my_box');
	my.onmouseenter=function (){
		my_box.style.display='block';
		my.style.background='#fff';
		my.style.borderLeft='1px solid #ccc';
		my.style.borderRight='1px solid #ccc';
	}
	my.onmouseleave=function (){
		my_box.style.display='none';
		my.style.background='#F1F1F1';
		my.style.borderLeft='1px solid transparent';
		my.style.borderRight='1px solid transparent';
	}
	//****************我的京东end**************
	//****************手机京东start************
	var phone=document.getElementById('phone');
	var phone_news=document.getElementById('phone_news');
	var bg1=document.getElementById('bg1');
	phone.onmouseenter=function (){
		phone_news.style.display='block';
		phone.style.borderLeft='1px solid #ccc';
		phone.style.borderRight='1px solid #ccc';
		phone.style.background='#fff';
		bg1.style.backgroundPosition='0px -25px';
	}
	phone.onmouseleave=function (){
		phone_news.style.display='none';
		phone.style.background='#F1F1F1';
		phone.style.borderLeft='1px solid transparent';
		phone.style.borderRight='1px solid transparent';
		bg1.style.backgroundPosition='0px 0px';
	}
	//****************手机京东end************
	//****************关注京东start**********
	var attention=document.getElementById('attention')
	var attention_news=document.getElementById('attention_news');
	var a=attention.getElementsByTagName('a')[0];
	attention.onmouseenter=function (){
		attention_news.style.display='block';
		attention.style.borderLeft='1px solid #ccc';
		attention.style.borderRight='1px solid #ccc';
		attention.style.background='#fff';
		a.style.color='#666';
	}
	attention.onmouseleave=function (){
		attention_news.style.display='none';
		attention.style.background='#F1F1F1';
		attention.style.borderLeft='1px solid transparent';
		attention.style.borderRight='1px solid transparent';
	}
	//****************关注京东end************
	//****************客户服务start***************
	var serve=document.getElementById('serve');
	var serve_box=document.getElementById('serve_box');
	var serve_a=document.getElementById('serve_a');
	serve.onmouseenter=function (){
		serve_box.style.display='block';
		serve.style.background='#fff';
		serve.style.borderLeftColor='#ccc';
		serve.style.borderRightColor='#ccc';
		serve_a.style.color='#666';
	}
	serve.onmouseleave=function (){
		serve_box.style.display='none';
		serve.style.background='#F1F1F1';
		serve.style.borderLeftColor='transparent';
		serve.style.borderRightColor='transparent';
	}
	//****************客户服务end*****************
	//****************网站导航start***************
	var navigation=document.getElementById('navigation');
	var nav_box=document.getElementById('nav_box');
	var navigation_a=document.getElementById('navigation_a');
	navigation.onmouseenter=function (){
		nav_box.style.display='block';
		navigation.style.borderLeftColor='#ccc';
		navigation.style.borderRightColor='#ccc';
		navigation.style.background='#fff';
		navigation_a.style.color='#666';
	}
	navigation.onmouseleave=function (){
		nav_box.style.display='none';
		navigation.style.borderLeftColor='transparent';
		navigation.style.borderRightColor='transparent';
		navigation.style.background='#F1F1F1';
	}
	//****************网站导航end*****************
	// ****************topbanner start*************
	var top_banner=document.getElementById('top_banner');
	var topbanner_close=document.getElementById('topbanner_close');
	topbanner_close.onmouseenter=function (){
		topbanner_close.style.backgroundPosition='0px -19px';
	}
		topbanner_close.onmouseleave=function (){
		topbanner_close.style.backgroundPosition='0px 0px';
	}
	var timer1=null,timer2=null;
	var t=0,o=100;
	topbanner_close.onclick=function (){
		clearInterval(timer1);
		timer1=setInterval(function (){
			t-=2;
			o-=10;
			if (t<=-20) {
				t=-20;
				o=0;
				top_banner.style.display='none';
			};
			top_banner.style.top=t+'px';
			top_banner.style.opacity=o/100;
			top_banner.style.filter='alpha(opacity:'+o+')';
		},30)
	}
	// ****************topbanner end***************
	// ****************购物车 end***************
	var gouwuche=document.getElementById('gouwuche');
	var dropdown=document.getElementById('dropdown');
	var cw_icon=document.getElementById('cw_icon');
	var shopping_amount=document.getElementById('shopping_amount');
	gouwuche.onmouseenter=function (){
		dropdown.style.display='block';
		// cw_icon.style.borderBottomColor='#fff';
		cw_icon.style.background='#fff';
		shopping_amount.style.fontSize='0px';
		shopping_amount.style.lineHeight='1px';
	}
	gouwuche.onmouseleave=function (){
		dropdown.style.display='none';
		cw_icon.style.background='#f9f9f9';
		shopping_amount.style.fontSize='12px';
		shopping_amount.style.lineHeight='12px';
	}
	// ****************购物车 end***************
	// ****************搜索框 start************* 
	var ipt=document.getElementById('ipt');
	var inputwords=document.getElementById('inputwords');
	inputwords.onclick=function (){
		inputwords.style.display='none';
		ipt.focus();
	}
	ipt.onblur=function (){
		if (ipt.value=='') {
			inputwords.style.display='block';
		};
	}
	// ****************搜索框 end***************
	// <!-- 顶部菜单start -->
	var list1=document.getElementById('list1');
	var lis1=list1.getElementsByTagName('li');
	var as=list1.getElementsByTagName('a'); 
	var spans=list1.getElementsByTagName('span');
	var dropcontent=document.getElementById('dropcontent');
	var divs=document.getElementsByClassName('contentshow');
	var slider_left=document.getElementById('slider_left');
	for (var i = 0; i < lis1.length; i++) {
		lis1[i].index=i;
		lis1[i].onmouseenter=function (){
			for (var i = 0; i < lis1.length; i++) {
				divs[i].style.display='none';
				lis1[i].className='';
				spans[i].style.display='block';
				as[i].style.color='#fff';
			}
			lis1[this.index].className='select_li';
			divs[this.index].style.display='block';
			spans[this.index].style.display='none';
			as[this.index].style.color='#c81623';
		}
	};
	slider_left.onmouseleave=function (){
		for (var i = 0; i < lis1.length; i++) {
		divs[i].style.display='none';
		lis1[i].className='';
		as[i].style.color='#fff';
		spans[i].style.display='block';
		};
	}
// **************************大图滚动start******************
function bannerMove(){
				var middle_con_wrap=document.getElementById('middle_con_wrap');
				var middle_con=document.getElementById('middle_con');
				var middle_imgs=middle_con.getElementsByTagName('img');
				var middle_list=document.getElementById('middle_list');
				var middle_lis=middle_list.getElementsByTagName('li');
				var middle_left=document.getElementById('middle_left');
				var middle_right=document.getElementById('middle_right');
				var middle_timer1=null,middle_timer2=null;
				var img_index=0;//图片索引值
				middle_imgs[0].className='imgshow';
				middle_imgs[0].style.opacity=1;
				middle_imgs[0].style.filter='alpha(opacity:100)';
				function middle_automove(){
					clearInterval(middle_timer1);
					middle_timer1=setInterval(function (){
						img_index++;
						if (img_index>=middle_imgs.length) {
							img_index=0;
						};
						for (var i = 0; i < middle_imgs.length; i++) {
							middle_imgs[i].className='';
							middle_imgs[i].style.opacity=0.5;
							middle_imgs[i].style.filter='alpha(opacity:50)';
						};
						middle_imgs[img_index].className='imgshow';
						middle_move();
					},2000)
				}
				middle_automove();
				function middle_move(){
					var middle_o=50;
					clearInterval(middle_timer2);
					middle_timer2=setInterval(function (){
						middle_o+=10;
						if (middle_o>=100) {
							clearInterval(middle_timer2);
							middle_o=100;
						};
						middle_imgs[img_index].style.opacity=middle_o/100;
						middle_imgs[img_index].style.filter='alpha(opacity:'+middle_o+')';
					},15)
					for (var i = 0; i < middle_lis.length; i++) {
						middle_lis[i].className='';
					};
					middle_lis[img_index].className='lishow';
				}
				middle_left.onclick=function (){
					img_index++;
					if (img_index>=middle_imgs.length) {
						img_index=0;
					};
					for (var i = 0; i < middle_imgs.length; i++) {
						middle_imgs[i].className='';
					};
					middle_imgs[img_index].className='imgshow';
					middle_move();
					middle_automove()
				}
				middle_right.onclick=function (){
					img_index--;
					if (img_index<0) {
						img_index=middle_imgs.length-1;
					};
					for (var i = 0; i < middle_imgs.length; i++) {
						middle_imgs[i].className='';
					};
					middle_imgs[img_index].className='imgshow';
					middle_move();
					middle_automove();
				}
				for (var i = 0; i < middle_lis.length; i++) {
					middle_lis[i].index=i;
					middle_lis[i].onmouseenter=function (){
						img_index=this.index;
						for (var i = 0; i < middle_imgs.length; i++) {
							middle_imgs[i].className='';
						};
						middle_imgs[img_index].className='imgshow';
						middle_move();
						middle_automove();
					}
				};
				middle_con_wrap.onmouseenter=function (){
					middle_left.style.display='block';
					middle_right.style.display='block';
					clearInterval(middle_timer2);
					clearInterval(middle_timer1);
					middle_imgs[img_index].style.opacity=1;
					middle_imgs[img_index].style.filter='alpha(opacity=100)';
				}
				middle_con_wrap.onmouseleave=function (){
					middle_left.style.display='none';
					middle_right.style.display='none';
					clearInterval(middle_timer2);
					// middle_move();
					middle_automove();
					middle_imgs[img_index].style.opacity=1;
					middle_imgs[img_index].style.filter='alpha(opacity=100)';
				}
}
bannerMove();
// **************************大图滚动end********************
// **********************右部内容start京东快报**********
$(function (){
				$('.right_coninner .fore1').mouseover(function (){
					$('.right_coninner').hide();
					// $('.lifeserv').show();
					$('.lifeserv').show().animate({top:'0px'},600)
				})
})
// **********************右部内容end**********
// **********************今日推荐start**********
function todayTuijian(){
				var todays_left_wrap=document.getElementById('todays_left_wrap');
				var todays_left=document.getElementById('todays_left');
				var t_li=todays_left.getElementsByTagName('li');
				var left_wrap=document.getElementById('left_wrap');
				var t_left=document.getElementById('t_left');
				var t_right=document.getElementById('t_right');
				// var t_img=left_wrap.getElementsByTagName('img');
				var liw=t_li[0].clientWidth;
				// var imgw=t_img[0].clientWidth;
				var t_timer1=null;
				var t_timer2=null;
				// var flag=true;
				var lia=0;
				// var imga=0;
				todays_left_wrap.onmouseenter=function (){
					t_left.style.display='block';
					t_right.style.display='block';
				}
				todays_left_wrap.onmouseleave=function (){
					t_left.style.display='none';
					t_right.style.display='none';
				}
				// console.log(t_li.length);
				function autoMove(){
							clearInterval(t_timer1);
							t_timer1=setInterval(function (){
								// imga++;
								lia++;
								if (lia>=t_li.length) {
									lia=0;
								};
								var start=todays_left.scrollLeft;//起始位置
								var end=liw*lia;//结束位置
								var change=end-start;//变化量
								var minstep=0;//起始步数
								var maxstep=20;//最大步数
								var everystep=change/maxstep;//每步所走的距离
								clearInterval(t_timer2);
								t_timer2=setInterval(function (){//运动过程
									minstep++;
									if (minstep>=maxstep) {
										clearInterval(t_timer2);
									}
									start=start+everystep;
									todays_left.scrollLeft=start;
								},15)
								// autoMove();
							},2000)
						}

					function move(){
							var start=todays_left.scrollLeft;
							var end=liw*lia;
							var change=end-start;
							var minstep=0;
							var maxstep=20;
							var everystep=change/maxstep;
							clearInterval(t_timer2);
							t_timer2=setInterval(function (){
								minstep++;
								if (minstep>=maxstep) {
									clearInterval(t_timer2);
								}
								start=start+everystep;
								todays_left.scrollLeft=start;
							},15)
						}
				t_left.onclick=function (){
						lia--;
						if (lia<0) {
							lia=t_li.length-1;
						};
						move();
						autoMove();
						clearInterval(t_timer1);
				}
				t_right.onclick=function (){
						lia++;
						if (lia>=t_li.length) {
							lia=0;
						};
						move();
						autoMove();
						clearInterval(t_timer1);
					}
}
todayTuijian();
	// =============猜你喜欢start==========
	//===============猜你喜欢的线条动画效果==============
function lineMove(){
					var guessyou=document.getElementById('guessyou');
					var lazy_mc=document.getElementById('lazy_mc');
					var spacer=document.getElementById('spacer');
					var line=document.getElementById("line");
					var gtimer=null;
					lazy_mc.onmouseenter=function (){
						var spacerW=spacer.clientWidth;
						line.style.right=spacerW+'px';
						var g_r=spacerW;
						clearInterval(gtimer);
						gtimer=setInterval(function (){
								g_r-=35;
								if (g_r<=-1) {
									g_r=-1;
									clearInterval(gtimer);
								};
								line.style.right=g_r+'px';
						},10)
					}
}
lineMove();
//===================JQUERY实现===========
/*$('#guessyou').mouseenter(function (){
	var spacerW=$('#spacer').width();
	$('#line').css({right:spacerW+'px'});
	$('#line').stop().animate({right:'-1px'});
})*/
//========猜你喜欢的内容切换========
function guessYou(){
		var guess_tab=document.getElementById('guess_tab');
		var guess_list=document.getElementById('guess_list');
		// var guess_lis=guess_list.getElementsByTagName('li');
		var guess_imgs=guess_list.getElementsByTagName('img');
		var guess_spans=guess_list.getElementsByTagName('span');
		var guess_em=guess_list.getElementsByTagName('em');
		// console.log(guess_imgs.length);
		// console.log(guess_spans.length);
		// console.log(guess_em.length);
		var y=0;
		//json传入

		guess_tab.onclick=function(){
            if(window.XMLHttpRequest){
                var xml = new XMLHttpRequest();
            }
            else {
                var xml = new ActiveXObject();
            }
            xml.open("get","JavaScript/jd.json?"+Math.random(),true);
            xml.send(null);
            xml.onreadystatechange=function(){
                if(xml.readyState==4){
                    if(xml.status==200){
                    	// alert('123');
                        var x =JSON.parse(xml.responseText) ;
                        for(var i=0;i<6;i++){
                            guess_imgs[i].src= x.pic[i+y];
                            guess_spans[i].innerHTML= x.name[i+y];
                            guess_em[i].innerHTML= x.price[i+y];
                        }
                    }
                    else {
                    }
                }
            };
            y+=6;
            if(y>18){
                y=0;
            }
        };
}
guessYou();
	// =============猜你喜欢end==========
	// ==============每层楼大图滚动start=================
function floorMove(num,timer1,timer2){
	var out=document.getElementById('out'+num),
				 // imgs=out.getElementsByTagName('img'),
				 con=document.getElementById('con'+num),
				 licon=con.getElementsByTagName('li'),
				 num=out.getElementsByTagName('ul')[1],
				 lis=num.getElementsByTagName('li'),
				 left=out.getElementsByTagName('p')[0],
					right=out.getElementsByTagName('p')[1];
					// console.log(licon.length);
	// var ftimer1=null,ftimer2=null;
	var a=0,b=1;//a数字索引值,b图片索引值
	out.scrollLeft=licon[0].clientWidth;
	out.onmouseenter=function (){
				left.style.display='block';
				right.style.display='block';
				clearInterval(timer1);
				clearInterval(timer2);
	}
	out.onmouseleave=function (){
				left.style.display='none';
				right.style.display='none';
				move();
				autoMove();
	}
	function move(){
				var start=out.scrollLeft,//起始位置
									end=licon[0].clientWidth*b,//结束位置
									change=end-start,//变化量
									minstep=0,//起始步数
									maxstep=20,//最大步数
									everystep=change/maxstep;//每步所走的距离
					clearInterval(timer2);
					timer2=setInterval(function (){//	运动过程
									minstep++;
									if (minstep>=maxstep) {clearInterval(timer2)};
									start=start+everystep;
									out.scrollLeft=start;
					},15);
					for (var i = 0; i < lis.length; i++) {
						lis[i].className='';
					};
					lis[a].className='show';
	}

	function autoMove(){
				clearInterval(timer1);
				timer1=setInterval(function (){
					a++;//图片索引值
					if (a>=lis.length) {a=0;};
					b++;
					if (b>=licon.length) {
						b=2;
						out.scrollLeft=licon[0].clientWidth;
					};
					move();
						},2000)
			}
			autoMove();
	right.onclick=function (){
		a++;
		if (a>=lis.length) {a=0;};
		b++;
		if (b>=licon.length) {
			b=2;
			out.scrollLeft=licon[0].clientWidth;
		};
		move();
		autoMove();
	}
	left.onclick=function (){
		a--;
		if (a<0) {a=lis.length-1;};
		b--;
		if (b<=0) {
			b=licon.length-2;
			out.scrollLeft=licon[0].clientWidth*(b+1);
		};
		move();
		autoMove();
	}
	for (var i = 0; i < lis.length; i++) {
			lis[i].index=i;
			lis[i].onmouseenter=function (){
				a=this.index;
				b=this.index+1;
				move();
				autoMove();
			}
		};	
}
floorMove(1,timer1,timer2);
floorMove(2,timer1,timer2);
floorMove(3,timer1,timer2);
floorMove(4,timer1,timer2);
floorMove(5,timer1,timer2);
floorMove(6,timer1,timer2);
floorMove(7,timer1,timer2);
floorMove(8,timer1,timer2);
floorMove(9,timer1,timer2);
floorMove(10,timer1,timer2);
floorMove(11,timer1,timer2);
floorMove(12,timer1,timer2);
floorMove(13,timer1,timer2);
	// ==============每层楼大图滚动end===================
	// ===============每层楼Tab切换=======================
function floorTab(num){
	var floorTab=document.getElementById('floor_tab'+num);
	var lis=floorTab.getElementsByTagName('li');
	var as=floorTab.getElementsByTagName('a');
	// console.log(lis.length);
	// console.log(as.length);
	var show=byClass('floorcon'+num);
	// console.log(show.length);
	for (var i = 0,len=lis.length;i<len; i++) {
		lis[i].index=i;
		lis[i].onmouseenter=function (){
			for (var i = 0,len=show.length; i < len; i++) {
				lis[i].className='tab_item';
				show[i].style.display='none';
			};
			this.className='tab_item tab_select';
			show[this.index].style.display='block';
		}
	};

}
floorTab(1);
floorTab(2);
floorTab(3);
floorTab(4);
floorTab(5);
floorTab(6);
floorTab(7);
floorTab(8);
floorTab(9);
floorTab(10);
floorTab(11);
// ================热门晒单====================
function newMove(){
	var timer1=null,timer2=null;
	var wrap=document.getElementById("wrap");
	wrap.scrollTop=480;
	   function clear(){
        clearInterval(timer1);
        clearInterval(timer2);
    }
    function roll(){
        if(wrap.scrollTop%120==0){
            clear();
            timer2=setTimeout(function(){
                timer1=setInterval(autoscroll,10)
            },2000)
        }
    }
    function autoscroll(){
        wrap.scrollTop--;
        roll();
        if(wrap.scrollTop==0){
            wrap.scrollTop=120*4;
        }
        // console.log(wrap.scrollTop);
    }
    timer1=setInterval(autoscroll,1);
}
newMove();


// function newMove(){
// 	var wrap=document.getElementById('wrap');
// 	var con=document.getElementById('con');
// 	var lis=document.getElementsByTagName('li');
// 		console.log(lis[0].clientHeight);
// 		console.log(lis[1].clientHeight);
// 	var a=1;//li索引值
// 	var timer1=null,timer2=null;
// 	function autoMove(){
// 		clearInterval(timer1);
// 		timer1=setInterval(function (){
// 			a++;
// 			if (a>=lis.length) {
// 				a=2;
// 			wrap.scrollTop=lis[0].clientHeight;
// 			};
// 		},2000)

// 	}
// 	autoMove();

// }
// newMove();