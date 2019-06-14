   var canvas = document.querySelector('canvas');

var c = canvas.getContext('2d');

cW=c.canvas.width;
cH=c.canvas.height;

var cannon=new Image();
cannon.src="cannon1.jpg";


var dist = 15;
var gravity = 0.3;
var friction = 1;
var ballArray = [];
var bulletsArray = [];
var score=0;
var highscore=localStorage.getItem("highscore");
var control=0;
var id=null;




function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
   
    function Player(){
        this.canx = 0, this.cany =0, this.canw = 50, this.canh = 50;
        this.render = function(){
            c.drawImage(cannon,this.canx, this.cany, this.canw, this.canh);

        }
    }

    var player = new Player();
    player.canx = cW/2- player.canw/2;
    player.cany = cH-player.canh;
	
function Ball(x, y,number,number1, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.number=number;
    this.number1=number1;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = "blue";

	this.update = function() {
		if (this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * friction;
			this.dx = this.dx * friction;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx * friction;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
        this.text(this.number);
	};

	this.draw = function() {
        var g1=c.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);
		g1.addColorStop(0,	"#F4A460");
		g1.addColorStop(1,"black");
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = g1;
		c.fill();
		c.stroke();
		c.closePath();


	};
	
	this.text=function(number){
			c.fillStyle="white";
		c.font=" bold 20px Arial,sans-serif";
		c.fillText(number,this.x,this.y+this.radius/2);
		c.textAlign='center';
		c.textBaseline='bottom';
	}
}	


function init() {
	
	var radius = randomIntFromRange(23,30);
    var q=Math.ceil(Math.random()*2);
    if(q==0||q==2){p=radius+2;}
    else{p=canvas.width-radius-2;}
		var x = p;
		var y = radius+10;
		var dx = randomIntFromRange(3, 5);
		var dy = randomIntFromRange(3,4);
		var number=randomIntFromRange(4,12);
		var number1=number;
	    ballArray.push(new Ball(x, y,number,number1, dx, dy, radius,"red"));
	
}init();
setInterval(init,6000);

function Ballset(x, y,number, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.number=number;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = "blue";

	this.update = function() {
		if (this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dy;
			this.dy = this.dy * friction;
			this.dx = this.dx * friction;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx * friction;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
        this.text(this.number);
	};

	this.draw = function() {
        var g1=c.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);
		g1.addColorStop(0,	"#F4A460");
		g1.addColorStop(1,"black");
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = g1;
		c.fill();
		c.stroke();
		c.closePath();


	};
	
	this.text=function(number){
			c.fillStyle="white";
		c.font=" bold 20px Arial,sans-serif";
		c.fillText(number,this.x,this.y+this.radius/2);
		c.textAlign='center';
		c.textBaseline='bottom';
	}
}




function bullets(x, y, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.radius = radius;
	this.color = "blue";

	this.update = function() {


		this.y -= this.dy;
		this.draw();
	};

	this.draw = function() {

		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = "blue";
		c.fill();
		c.stroke();
		c.closePath();
	};
}





function initbullets() {
	
	var radius = 4;

		var x = player.canx+player.canw/2;
		var y = player.cany;
		var dy = 10;
	    bulletsArray.push(new bullets(x, y, dy, radius,"blue"));
		
	
}initbullets();
setInterval(initbullets,160);



function animate() {
	id=requestAnimationFrame(animate);

	c.clearRect(0, 0, canvas.width, canvas.height);
    player.render();


		
	for (var i = 0; i < bulletsArray.length; i++) 
    {
		bulletsArray[i].update();
	}
	
	for (var i = 0; i < ballArray.length; i++) 
	{
		ballArray[i].update();	
	}


    for(var i=0; i <bulletsArray.length; i++){
    var m =bulletsArray[i];

    hitDetect(this.bulletsArray[i],i);
    if(m.y <= 0){ // If a missile goes past the canvas boundaries, remove it
                 bulletsArray.splice(i,1); // Splice that missile out of the missiles array
                }
}
if(control==1){
	cancelAnimationFrame(id);
}

	 
}


	        hitDetect = function(m,mi){
            for(var i = 0; i < ballArray.length; i++){
                var e = ballArray[i];
				 var distX = Math.abs(e.x - player.canx-player.canw/2);
                 var distY = Math.abs(e.y - player.cany-player.canh/2);
                if(Math.sqrt(Math.pow((e.x-m.x),2)+Math.pow((e.y-m.y),2))<=e.radius+m.radius){
					e.number--;
                    this.bulletsArray.splice(this.bulletsArray[mi],1);					// Remove the missile
					if(e.number==0){	
                    ballArray.splice(i,1);
					if(e.number1/2>1){
					ballArray.push(new Ballset(e.x+5, e.y+5,Math.floor((e.number1)/2), e.dx+2, e.dy, e.radius,"red"));
					ballArray.push(new Ballset(e.x-5, e.y-5,Math.ceil((e.number1)/2), e.dx-2, e.dy, e.radius,"red"));					// Remove the enemy that the missile hit
					}
					score++;
					if(score>highscore){
						highscore=score;
						localStorage.setItem("highscore",highscore);
					}
					}
					
					}
                    document.getElementById('status').innerHTML = "Score "+score;
					document.getElementById('status2').innerHTML="HIghscore: "+localStorage.getItem("highscore");
					
                }
				if(((e.x>=player.canx)&&(e.x<=player.canx+player.canw)&&(e.y+e.radius>=player.cany)&&(e.y+e.radius<=player.cany+player.canh))||((e.x-e.radius>=player.canx+5)&&(e.x-e.radius<=player.canx+player.canw)&&(e.y>=player.cany)&&(e.y<=player.cany+player.canh))||((e.x+e.radius>=player.canx)&&(e.x+e.radius<=player.canx+player.canw)&&(e.y>=player.cany)&&(e.y<=player.cany+player.canh))){
				control=1;			
				document.getElementById('status').innerHTML = "&#9760 GAME OVER &#9760 YOU HAVE MANAGED TO DESTROY "+score+ " ROCKS";
				}
            }


 document.addEventListener('keydown', function(event) {
        var key_press = String.fromCharCode(event.keyCode);
        //alert(event.keyCode+" | "+key_press);
        if(key_press == "%"){
            player.canx-=dist;
        } else if(key_press == "'"){
            player.canx+=dist;
        } else if(key_press == "A"){
            player.canx-=dist;
        }  else if(key_press == "D"){
            player.canx+=dist;
        }
		
	    if(player.canx<0){
		  player.canx=0;
	    }
		else if(player.canx>c.canvas.width-player.canw){
		  player.canx=c.canvas.width-player.canw;
	    }
    });


animate();
