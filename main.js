const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();

var dt=new Date();
const tex=canvas.width;
const tey=canvas.height;
var encour=true;
var bide={px:50,py:tey/2,tx:30,ty:30,vity:0,an:0,dan:dt.getTime(),tpan:100,imgs:[document.getElementById("b1"),document.getElementById("b2"),document.getElementById("b3"),document.getElementById("b4"),document.getElementById("b5"),document.getElementById("b6"),document.getElementById("b7"),document.getElementById("b8")]};
var nobs=[];
var obs=[];
var nbobs=3;
var distobs=300;
var vit=2;
var cgrav=0.2;
var dev=dt.getTime();
var tev=10;
var perdu=false;
var acc=3.5;
var score=0;
var espace=200;

const bgs=[document.getElementById("bg1"),document.getElementById("bg2"),document.getElementById("bg3"),document.getElementById("bg4"),document.getElementById("bg5"),document.getElementById("bg6"),document.getElementById("bg7"),document.getElementById("bg8"),document.getElementById("bg9"),document.getElementById("bg10"),document.getElementById("bg11"),document.getElementById("bg12")];

var bg=bgs[parseInt(Math.random()*bgs.length)];
var bgtx=bg.width;
var bgty=bg.height;
console.log(bgtx+" "+bgty);
var bgx=0;

function toColor(cl){
	return "rgb("+cl[0]+","+cl[1]+","+cl[2]+")";
}

function collide(rect1,rect2){
	if (rect1.px < rect2.px + rect2.tx && rect1.px + rect1.tx > rect2.px && rect1.py < rect2.py + rect2.ty && rect1.ty + rect1.py > rect2.py) return true
    return false;
}

function jump(){ bide.vity-=acc; }

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
		obs.push( {tp:1,px:xx,py:y1,tx:tx,ty:ty1,cl:cl,pt:false} );
		obs.push( {tp:2,px:xx,py:y2,tx:tx,ty:ty2,cl:cl,pt:false} );
	}
}

function aff(){
	ctx.fillStyle="rgb(0,0,0)";
	ctx.fillRect(0,0,tex,tey);
	ctx.drawImage(bg, bgx , 0 , bgtx*(tey/bgty) , tey)
	ctx.drawImage(bg, bgx+bgtx*(tey/bgty) , 0, bgtx*(tey/bgty) , tey)
	ctx.drawImage( bide.imgs[bide.an] , bide.px , bide.py , bide.tx , bide.ty );
	for(o of obs){
		ctx.fillStyle=toColor(o.cl);
		ctx.fillRect(o.px,o.py,o.tx,o.ty);
	}
	ctx.font = "50px Arial";
	ctx.fillStyle="rgb(0,0,200)";
    ctx.fillText(score+"", 10, 50);
}

function ev(){
	var dt=new Date();
	if( dt.getTime()-dev>=tev){
		dev=dt.getTime();
		if(dt.getTime()-bide.dan>=bide.tpan){
		    bide.dan=dt.getTime();
		    bide.an+=1;
		    if( bide.an >= bide.imgs.length ){
		        bide.an=0;
		    }
		}
		if(bide.vity<5) bide.vity+=cgrav;
	    bide.py+=bide.vity;
	    bgx-=vit;
	    if( bgx>=bgtx) bgx=0;
	    nobs=[];
	    for(o of obs){
		    o.px-=vit;
		    if( collide(bide, o)){
			    perdu=true;
		    }
		    if( o.tp==1 && o.px < bide.px && !o.pt ){
		        o.pt=true;
		        score+=1;
		    }
		    if( o.px+o.tx>0 ){
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
    //const x = event.clientX - rect.left
    //const y = event.clientY - rect.top
    jump();
}

canvas.addEventListener('mouseup', function(e) {
    getCursorPosition(canvas, e)
})


function affperdu(){
	ctx.fillStyle="rgb(20,20,20)";
	ctx.fillRect(0,0,tex,tey);
	ctx.font = "50px Serif";
	ctx.fillStyle="rgb(100,0,130)";
    ctx.fillText("Perdu !", 140, 100);
    ctx.fillText("(°°)", 150, 200);
    ctx.font = "30px Serif";
    ctx.fillText("~", 180, 210);
	ctx.font = "30px Serif";
    ctx.fillText("score : "+score, 50, 400);
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

alert("ready ?");
main();
