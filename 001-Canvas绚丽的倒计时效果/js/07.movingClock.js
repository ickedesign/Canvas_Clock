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

//const定义的变量不可以修改，而且必须初始化
const endTime=new Date(2017,2,8,20,14,12);
var showTimeSeconds=0;

window.onload=function(){

	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");

	canvas.width=canvasWidth;
	canvas.height=canvasHeight;

	showTimeSeconds=getCurrentShowTime();
	
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
function getCurrentShowTime(){
	var currentTime=new Date();
	//getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
	var ret=endTime.getTime()-currentTime.getTime();
	//将毫秒化成秒,ret要加上
	ret=Math.round(ret/1000);
	return ret>=0?ret:0;
}

//通过比较当前时间和接下来的时间来更新时间
function update(){
	
	var nextShowTimeSeconds=getCurrentShowTime();
	var nextHours=parseInt(nextShowTimeSeconds/3600);
	//hour记得改
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextShowTimeSeconds%60;	

	var curHours=parseInt(showTimeSeconds/3600);
	var curMinutes=parseInt((showTimeSeconds-curHours*3600)/60);
	var curSeconds=showTimeSeconds%60;	

	if(nextSeconds!=curSeconds){
		showTimeSeconds=nextShowTimeSeconds;
	}

}

//初始化时间
function render(cxt){

	//加上clearRect用于清除矩形,fillRect是填充矩形，参数类似。这样
	//后来生成的动画就不会和原来的叠加在一起了
	cxt.clearRect(0,0,canvasWidth,canvasHeight);//从右上角开始，范围是整个画布

	//获取当前剩下的倒计时时间
	var hours=parseInt(showTimeSeconds/3600);
	var minutes=parseInt((showTimeSeconds-hours*3600)/60);
	var seconds=showTimeSeconds%60;

	//parseInt(hours/10)取得hours的十位数
	renderDigit(marginLeft,marginTop,parseInt(hours/10),cxt);
	//一个圆的直径为2*(radius+1),一个数字的单列有七个圆
	renderDigit(marginLeft+15*(radius+1),marginTop,parseInt(hours%10),cxt);
	
	renderDigit(marginLeft+30*(radius+1),marginTop,10,cxt);

	//冒号，由四个圆组成
	renderDigit(marginLeft+39*(radius+1),marginTop,parseInt(minutes/10),cxt);
	renderDigit(marginLeft+53*(radius+1),marginTop,parseInt(minutes%10),cxt);

	renderDigit(marginLeft+67*(radius+1),marginTop,10,cxt);
	renderDigit(marginLeft+76*(radius+1),marginTop,parseInt(seconds/10),cxt);
	renderDigit(marginLeft+91*(radius+1),marginTop,parseInt(seconds%10),cxt);	

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
