var dog, dogH, dogS;
var foodObj;
var foodS, foodStock;
var fedTime, lastFed, feed, addFood

function preload(){
  dogS = loadImage("images/dogImg1.png");
  dogH = loadImage("images/dogImg.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(dogS);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
}


function draw() {  
  background("lightgreen");

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill("white");
  textSize(15);

  if(lastFed >= 12){
    text("Last Fed: " + lastFed % 12 + "Pm", 350, 30);
  } else if(lastFed == 0){
    text("Last Fed: 12Am", 350, 30)
  } else {
    text("Last Fed: " + lastFed + "Am", 350, 30);
  }

  drawSprites();
}

function readStock(){
  foodS = data.val();
  foodObj.updateFood(foodS)
}

function feedDog(){
  dog.addImage(dogH);

  foodObj.updateFood(foodObj.getFood() - 1);
  database.ref('/').update({
    Food: foodObj.getFood(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}



