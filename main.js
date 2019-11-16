canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");

var dt=new Date();
var tex=canvas.width;
var tey=canvas.height;
var encour=true;
var bide={px:50,py:tey/2,tx:30,ty:30,vity:0,cl:[30,200,50]};
var nobs=[];
var obs=[];
var nbobs=2;
var distobs=500;
var vit=2;
var cgrav=0.2;
var dev=dt.getTime();
var tev=10;
var perdu=false;
var acc=3.5;
var score=0;
var espace=200;

function toColor(cl){
	return "rgb("+cl[0]+","+cl[1]+","+cl[2]+")";
}

function collide(rect1,rect2){
	if (rect1.px < rect2.px + rect2.tx &&
       rect1.px + rect1.tx > rect2.px &&
       rect1.py < rect2.py + rect2.ty &&
       rect1.ty + rect1.py > rect2.py) {
        return true;
    }
    return false;
}

function jump(){
	bide.vity-=acc;
}

function genObs(){
	while(obs.length<nbobs*2){
		if( obs.length<=0 ) xx=distobs;
		else xx=obs[obs.length-1].px+distobs;
		tx=30;
		y1=0;
		ty1=Math.random()*tey/1.5;
		y2=ty1+espace;
		ty2=tey-y2;
		cl=[255,0,0];
		obs.push( {tp:1,px:xx,py:y1,tx:tx,ty:ty1,cl:cl} );
		obs.push( {tp:2,px:xx,py:y2,tx:tx,ty:ty2,cl:cl} );
	}
}

function aff(){
	ctx.fillStyle="rgb(200,200,200)";
	ctx.fillRect(0,0,tex,tey);
	ctx.fillStyle=toColor(bide.cl);
	ctx.fillRect(bide.px,bide.py,bide.tx,bide.ty);
	for(o of obs){
		ctx.fillStyle=toColor(o.cl);
		ctx.fillRect(o.px,o.py,o.tx,o.ty);
	}
}

function ev(){
	var dt=new Date();
	if( dt.getTime()-dev>=tev){
		dev=dt.getTime();
		if(bide.vity<5) bide.vity+=cgrav;
	    bide.py+=bide.vity;
	    nobs=[];
	    for(o of obs){
		    o.px-=vit;
		    if( collide(bide, o)){
			    perdu=true;
		    }
		    if( o.px>0 ){
		        nobs.push(o);
		    }
	    }
	    obs=nobs;
	    if(bide.py<0 || bide.py+bide.ty>tey ){
		    perdu=true;
	    }
	}
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    jump();
}

canvas.addEventListener('mouseup', function(e) {
    getCursorPosition(canvas, e)
})


function affperdu(){
	ctx.fillStyle="rgb(20,20,20)";
	ctx.fillRect(0,0,tex,tey);
}

function main(){

    function boucle(){
        ev();
        aff();
        genObs();
        if(perdu){
            encour=false;
            affperdu();
        }
        if(encour) window.requestAnimationFrame(boucle);
    }
    window.requestAnimationFrame(boucle);
}

alert("yo");
main();
