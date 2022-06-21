var PLAY = 1;
var END = 0;
var gameState = PLAY;

var city, police, thief, dynamite, invisibleGround
var cityImg, police_runningImg, police_deadImg, thief_runningImg, dynamiteImg, dynamite_explodedImg
var dynamite
var score = 0

function preload(){
//loaded images
 cityImg = loadImage ("city.jpg")
 police_runningImg = loadAnimation ("police_running.png")
 police_deadImg = loadAnimation ("police_dead.png")
 thief_runningImg = loadImage ("thief.png")
 dynamiteImg = loadImage ("dynamite.png")
 dynamite_explodedImg = loadImage ("dynamite_exploded.png")

}

function setup() {
 //canvas created
 createCanvas (400, 375)

 dynamiteGroup = new Group()

 //moving background
 city=createSprite(200,200);
 city.addImage(cityImg);
 city.velocityX = -4;

 //creating police and thief
 police=createSprite(50,325);
 police.addAnimation("running", police_runningImg);
 police.addAnimation("dead", police_deadImg)
 police.scale = 0.9

 thief=createSprite(300,325);
 thief.addImage(thief_runningImg);
 thief.scale = 0.5  

 //invisible ground
 invisibleGround = createSprite(200,390,400,10);
 invisibleGround.visible = false;
}

function draw() {
 background(0)
 //displaying score
 text("Score: "+ score, 500,50);

 //add gravity
 police.velocityY = police.velocityY + 0.8

 //stop police from falling down
 police.collide(invisibleGround);

 if(gameState === PLAY){

 //code to reset the background
 if(city.x < -500 ){
    city.x = city.width/2;
 }

//jump when the space key is pressed
 if(keyDown("space")&& police.y >= 100) {
    police.velocityY = -12;
  }

//console.log (PLAY)
//console.log (END)
 createDynamite()

 if (dynamiteGroup.isTouching(police)) {
     gameState = END
 }
 } else if (gameState === END){
     console.log(gameState)
     dynamite.changeAnimation("explode", dynamite_explodedImg)
     city.velocityX = 0
    dynamiteGroup.setVelocityXEach(0)
    police.changeAnimation("dead", police_deadImg)
    police.scale = 0.5
 }

 drawSprites()
}

function createDynamite() {
    if (frameCount % 200 === 0) {
        dynamite = createSprite (275, 350, 10, 10);
        dynamite.addAnimation("dynamite", dynamiteImg);
        dynamite.addAnimation("explode", dynamite_explodedImg);
        dynamite.scale=0.2;
        dynamite.velocityX = -5;
        dynamite.lifetime = 150;
        dynamiteGroup.add(dynamite)
      }
}