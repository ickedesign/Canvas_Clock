var canvasWidth="900";
var canvasHeight="500";
var ball={x:500,y:100,r:20,g:2,vx:-4,vy:0,color:"#005588"};

window.onload=function(){
	var canvas=document.getElementById("canvas");
	canvas.width=canvasWidth;
	canvas.height=canvasHeight;
	var context=canvas.getContext("2d");

	setInterval(
		function(){
			render(context);
			update();
		},
		50
	)

	render(context);
}
function update(){
	ball.x+=ball.vx;
	ball.y+=ball.vy;
	ball.vy+=ball.g;

	//当小球触底后会反弹
	if(canvasHeight-ball.y<=ball.r){
		ball.y=canvasHeight-ball.r;
		ball.vy=-ball.vy*0.5;//添加阻力系数
	}
}
function render(ctx){
	
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.fillStyle=ball.color;

	ctx.beginPath();
	ctx.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
	ctx.closePath();

	ctx.fill();
}