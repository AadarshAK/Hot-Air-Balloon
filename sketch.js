var balloon, Banimation, balloonPos;
var database;
var balloonPos, backgroundImg;

function preload(){
  Banimation=loadAnimation("b2.png","b3.png","b4.png");
  backgroundImg=loadImage("bck.png"); 
}

function setup() {
  database=firebase.database();
  createCanvas(1200,800);

  balloon=createSprite(400, 300, 50, 50);
  balloon.addAnimation("Banimation",Banimation);
  
}

function draw() {

  background(255,255,255);  
  balloonPos=database.ref('balloon/position');
  balloonPos.on("value",readPosition,showError);
  
  if(KeyDown("UP_ARROW")){
    balloon.updatePosition(0,-1);
  }

  if(KeyDown("DOWN_ARROW")){
    balloon.updatePosition(0,1);
  }

  if(KeyDown("LEFT_ARROW")){
    balloon.updatePosition(-1,0);
  }
  
  if(KeyDown("RIGHT_ARROW")){
    balloon.updatePosition(0,1);
  }

  drawSprites();
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y
  })
}

function readPosition(data){
    position=data.val;
    balloon.x=position.x;
    balloon.y=position.y
}

function showError(){
  console.log("Error in writing to the database")
}