var city, police, thief, dynamite
var cityImg, police_runningImg, police_deadImg, thief_runningImg, dynamiteImg, dynamite_explodedImg
var dynamite
var score = 0

function preload(){
//loaded images
 cityImg = loadImage ("city.jpg")
 police_runningImg = loadImage ("police_running.png")
 police_deadImg = loadImage ("police_dead.png")
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
 police=createSprite(100,325);
 police.addImage(police_runningImg);
 police.addImage(police_deadImg)
 police.scale = 0.9

 thief=createSprite(300,325);
 thief.addImage(thief_runningImg);
 thief.scale = 0.5
}

function draw() {

 //displaying score
 text("Score: "+ score, 500,50);

 //code to reset the background
 if(city.x < -1000 ){
    city.x = 1000;
 }

 createDynamite()

 if (dynamiteGroup.isTouching(police)) {
     city.velocityX = 0
     police.changeImage(police_deadImg)
 }

 drawSprites()
}

function createDynamite() {
    if (frameCount % 200 === 0) {
        dynamite = createSprite (275, 350, 10, 10);
        dynamite.addImage(dynamiteImg);
        dynamite.scale=0.2;
        dynamite.velocityX = -3;
        dynamite.lifetime = 150;
        dynamiteGroup.add(dynamite)
      }
}