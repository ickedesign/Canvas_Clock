/*
	使用setInterval来构建一个足帧的动画
	setInterval(
		function(){
			render();//画出这个图形
			update();//对图形进行更新
		},
		50 //一秒有1000毫秒，即20分之1，
		//所以帧率为20.但事实上，因为里面的函数执行效率不同，所以帧数不一定为20
	)
 */

var canvasWidth="1024";
var canvasHeight="500";
//marginTop和marginLeft表示canvas这个画布的左上角坐标
var marginTop=0;
var marginLeft=0;
var radius=8;
var balls=[];
var colors=["#33B5E5","#0099CC","AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

//const定义的变量不可以修改，而且必须初始化
const endTime=new Date(2017,2,9,20,14,12);
var curShowTimeSeconds=0;

window.onload=function(){

	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");

	canvas.width=canvasWidth;
	canvas.height=canvasHeight;

	curShowTimeSeconds=getCurrentShowTimeSeconds();
	
	//添加时钟的动画效果
	setInterval(
		function(){
			render(context);//初始化时间
			update();//对时间进行更新
		},
		50 //一秒有1000毫秒，即20分之1，
		//所以帧率为20.但事实上，因为里面的函数执行效率不同，所以帧数不一定为20
	)

}
//获取倒计时的时间
function getCurrentShowTimeSeconds(){
	var currentTime=new Date();
	//getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
	var ret=endTime.getTime()-currentTime.getTime();
	//将毫秒化成秒,ret要加上
	ret=Math.round(ret/1000);
	return ret>=0?ret:0;
}

//通过比较当前时间和接下来的时间来更新时间
function update(){
	
	var nextShowTimeSeconds=getCurrentShowTimeSeconds();

	var nextHours=parseInt(nextShowTimeSeconds/3600);
	//hour记得改
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextShowTimeSeconds%60;	

	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds=curShowTimeSeconds%60;	

	if(nextSeconds!=curSeconds){

		//更新小球的生成
		if(parseInt(nextHours/10)!=parseInt(curHours/10)){
			addBalls(marginLeft+0,marginTop,parseInt(nextHours/10));
		}
		if(parseInt(nextHours%10)!=parseInt(curHours%10)){
			addBalls(marginLeft+15*(radius+1),marginTop,parseInt(nextHours%10));
		}
		if(parseInt(nextMinutes/10)!=parseInt(curMinutes/10)){
			addBalls(marginLeft+39*(radius+1),marginTop,parseInt(nextMinutes/10));
		}
		if(parseInt(nextMinutes%10)!=parseInt(curMinutes%10)){
			addBalls(marginLeft+54*(radius+1),marginTop,parseInt(nextMinutes%10));
		}
		if(parseInt(nextSeconds/10)!=parseInt(curSeconds/10)){
			addBalls(marginLeft+78*(radius+1),marginTop,parseInt(nextSeconds/10));
		}
		if(parseInt(nextSeconds%10)!=parseInt(curSeconds%10)){
			addBalls(marginLeft+93*(radius+1),marginTop,parseInt(nextSeconds%10));
		}				
		//更新剩下的时间
		curShowTimeSeconds=nextShowTimeSeconds;
	}

	updateBalls();
	console.log(balls.length);
}


//对生成的小球进行运动更新
function updateBalls(){

	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		//当小球碰地后会反弹
		if(canvasHeight-balls[i].y<=radius){
			balls[i].y=canvasHeight-radius;
			balls[i].vy=-balls[i].vy*0.75;//添加阻力系数
		}	
	}

	//及时清空跳出画布的小球，优化页面的内存
	var cnt=0
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+radius>0&&balls[i].x-radius<canvasWidth){
			//小球数组中的第0个到cnt-1个是在canvas画布中
			balls[cnt++]=balls[i];
		}
	}
	//Math.min();两个数取最小值
	while(balls.length>Math.min(250,cnt)){
		balls.pop();//删除第cnt个到balls.length-1个数组
		//删除前面的数组使用balls.shift();
	}
	/*while(balls.length>cnt){
		balls.pop();//删除第cnt个到balls.length-1个数组
	}*/

}

//取得的小球集合，并push到balls[]中
function addBalls(x,y,num){
	
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				//定义aBall
				var aBall={
					x: x+j*2*(radius+1)+(radius+1),
					y: y+i*2*(radius+1)+(radius+1),
					//幂运算
					vx: Math.pow(-1,Math.floor(Math.random()*1000))*4,
					vy: -5,
					g: 1.5+Math.random(),
					color: colors[Math.floor(Math.random()*colors.length)]
				};
				//将小球push进集合中
				balls.push(aBall);
			}
		}
	}
}

//初始化时间
function render(cxt){

	//加上clearRect用于清除矩形,fillRect是填充矩形，参数类似。这样
	//后来生成的动画就不会和原来的叠加在一起了
	cxt.clearRect(0,0,canvasWidth,canvasHeight);//从右上角开始，范围是整个画布

	//获取当前剩下的倒计时时间
	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds=curShowTimeSeconds%60;

	//parseInt(hours/10)取得hours的十位数
	renderDigit(marginLeft,marginTop,parseInt(hours/10),cxt);
	//一个圆的直径为2*(radius+1),一个数字的单列有七个圆
	renderDigit(marginLeft+15*(radius+1),marginTop,parseInt(hours%10),cxt);
	
	renderDigit(marginLeft+30*(radius+1),marginTop,10,cxt);

	//冒号，由四个圆组成
	renderDigit(marginLeft+39*(radius+1),marginTop,parseInt(minutes/10),cxt);
	renderDigit(marginLeft+54*(radius+1),marginTop,parseInt(minutes%10),cxt);

	renderDigit(marginLeft+69*(radius+1),marginTop,10,cxt);
	renderDigit(marginLeft+78*(radius+1),marginTop,parseInt(seconds/10),cxt);
	renderDigit(marginLeft+93*(radius+1),marginTop,parseInt(seconds%10),cxt);	

	//对生成的小球进行绘制
	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI);
		cxt.closePath();

		cxt.fill();
	}
}

//绘制数字和冒号
function renderDigit(x,y,num,cxt){

	cxt.fillStyle="rgb(0,102,153)";
	//先绘制出1
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			//digit[num][i][j]，这里的数组不要写错了 
			if(digit[num][i][j]==1){
				cxt.beginPath();
				//弧形的绘制方法在图上画一下就清楚了，注意*记得写
				cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}

		}
	}

}
