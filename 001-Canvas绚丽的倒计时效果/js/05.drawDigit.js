var canvasWidth="1024";
var canvasHeight="500";
//marginTop和marginLeft表示canvas这个画布的左上角坐标
var marginTop=0;
var marginLeft=0;
var radius=8;

window.onload=function(){

	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");

	canvas.width=canvasWidth;
	canvas.height=canvasHeight;
	render(context);

}
//初始化时间
function render(cxt){

	var hours=10;
	var minutes=34;
	var seconds=38;
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
