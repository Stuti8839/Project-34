//Create variables here
var dog, dogImage, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);

  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.25;

  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on('value', readStock);
}


function draw() {  
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  text("Food Remaining : " + foodS, 180, 180);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}