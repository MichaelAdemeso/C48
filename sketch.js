var backgroundImg;
var canvas;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var nimbus,nimbus_flying,nimbus_collided;

var dragonballsGroup,dragonballsImage;
var enemiesGroup, enemy1,enemy2,enemy3,enemy4,enemy5,enemy6;

var score=0;

var gameOver, restart;




function preload(){
  nimbus_flying=loadAnimation("nimbus.png","nimbus_2.png","nimbus_3.png","nimbus_4.png")
  nimbus_collided=loadAnimation("nimbus_collided.png")

  backgroundImg=loadImage("DBZ.png")

  dragonballsImage=loadImage("Dragonballs.png")

  enemy1=loadImage("enemy 1.png")
  enemy2=loadImage("enemy 2.png")
  enemy3=loadImage("enemy 3.png")
  enemy4=loadImage("enemy4.png")
  enemy5=loadImage("enemy5.png")
  enemy6=loadImage("enemy6.png")

  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  
  nimbus=createSprite(50,300)
  nimbus.addAnimation("flying",nimbus_flying)
  nimbus.addAnimation("collided",nimbus_collided)
  nimbus.scale=0.5

  gameOver =  createSprite(2000,1500);
  gameOver.addImage("gameOver",gameOverImg);

  restart = createSprite(300,140);
  restart.addImage("restart",restartImg)

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  dragonballsGroup = new Group();
  enemiesGroup = new Group();

  score = 0;
}

function draw() {
  background(backgroundImg);
  
  if (gameState===PLAY){

    nimbus.changeAnimation("flying", nimbus_flying);
    
    if (keyDown(UP_ARROW)) {
      nimbus.velocityY = -12
    }
  
    if (keyDown(DOWN_ARROW)) {
      nimbus.velocityY = 12
    }
  }
  

  if(dragonballsGroup.isTouching(nimbus)){
    dragonballsGroup.destroyEach();
    score = score+1
  }

  if(enemiesGroup.isTouching(nimbus)){
    gameState = END;
}

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    nimbus.velocityY = 0;

    enemiesGroup.setVelocityXEach(0);
    dragonballsGroup.setVelocityXEach(0);
    
    nimbus.changeAnimation("collided",nimbus_collided);
    
    enemiesGroup.setLifetimeEach(-1);
    dragonballsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
 
}
spawnEnemy();
spawnDragonball();

drawSprites();
}

function spawnDragonball() {

  if (frameCount % 60 === 0) {
    
    var dragonball = createSprite(600,120,40,10);
    dragonball.y = Math.round(random(80,120));
    dragonball.addImage(dragonballsImage);
    dragonball.scale = 0.1;
    dragonball.velocityX = -3;
    
    dragonball.lifetime = 200;
    
    dragonballsGroup.add(dragonball);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  enemiesGroup.destroyEach();
  dragonballsGroup.destroyEach();
  score = 0;
}

function spawnEnemy() {
  if(frameCount % 60 === 0) {
    var enemy = createSprite(600,165,10,40);
  
    enemy.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: enemy.addImage("e1",enemy1);
              break;
      case 2: enemy.addImage("e2",enemy2);
              break;
      case 3: enemy.addImage("e3",enemy3);
              break;
      case 4: enemy.addImage("e4",enemy4);
              break;
      case 5: enemy.addImage("e5",enemy5);
              break;
      case 6: enemy.addImage("e6",enemy6);
              break;
      default: break;
    }
    enemy1.scale = 0.1;
    enemy1.lifetime = 300;

    enemy2.scale = 0.1;
    enemy2.lifetime = 300;

    enemy3.scale = 0.1;
    enemy3.lifetime = 300;

    enemy4.scale = 0.1;
    enemy4.lifetime = 300;

    enemy5.scale = 0.1;
    enemy5.lifetime = 300;

    enemy6.scale = 0.1;
    enemy6.lifetime = 300;

    enemiesGroup.add(enemy);
    enemy.scale=0.2
  }
}