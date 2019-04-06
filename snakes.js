//snakes Game

//function init,draw,update

function init()
{
  alert("Game start");
  canvas=document.getElementById('mycanvas');
  pen=canvas.getContext('2d');
  W=canvas.width;
  H=canvas.height;


  food = getRandomFood();
  score=5;
  snake={
    init_length:5,
    color:"#9b870c",
    cells:[],
    direction:"right",

    createSnake:function(){
      for(var i=this.init_length-1;i>=0;i--)
      {
        this.cells.push({x:i,y:0})
      }
    },
    drawSnake:function()
    {
      for(var i=0;i<this.cells.length;i++){
      pen.fillStyle=this.color;
      pen.strokeStyle="black";
      pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
      pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
    }
  },

  updateSnake:function()
  {
    headX=this.cells[0].x;
    headY=this.cells[0].y;

    //nextheadX=headX+1;
    if(headX==food.x && headY==food.y)
    {
      food=getRandomFood();
    }
    else {
      this.cells.pop();
    }

    //this.cells.unshift({x:nextheadX,y:headY});

    if(this.direction == "right")
    {
      nextX=headX+1;
      nextY=headY;
    }
    else if(this.direction == "left")
    {
      nextX=headX-1;
      nextY=headY;
    }
    else if(this.direction == "down")
    {
      nextX=headX;
      nextY=headY+1;
    }
    else if(this.direction == "up")
    {
      nextX=headX;
      nextY=headY-1;
    }
    this.cells.unshift({x:nextX,y:nextY});

  var boderx=Math.round(W/10);
  var bodery=Math.round(H/10);

  if(boderx==this.cells[0].x || bodery==this.cells[0].y || this.cells[0].y==-1||this.cells[0].x==-1)
  {
    alert("Gameover");
    init();
  }
  for(var i=1;i<this.init_length;i++)
  {
    if(this.cells[i].x == this.cells[0].x && this.cells[i].y == this.cells[0].y)
    {
      alert("you eat itself ! Gameover");
      init();
    }
  }
}

};
snake.createSnake();

//for event listener
//listen for keyboard

document.addEventListener('keydown',keyPressed);

function keyPressed(e){
  console.log(e.key);

  if(e.key=="ArrowUp")
  {
    snake.direction="up";
  }
  else if(e.key=="ArrowDown")
  {
    snake.direction="down";
  }
  else if(e.key=="ArrowLeft")
  {
    snake.direction="left";
  }
  else {
    snake.direction="right";
  }

}




}

function draw()
{
  pen.clearRect(0,0,W,H);
  console.log("Draw");
  snake.drawSnake();
  pen.fillStyle=food.color;
  pen.fillRect(food.x*10,food.y*10,10,10);

  pen.fillStyle="white";
  pen.font="14px Roboto";
  pen.fillText("Score: "+score,W-60,H-05);

}

function update()
{
  snake.updateSnake();
  // box.x += box.speed;
  //
  // if(box.x>=W || box.x<0)
  // {
  //   box.speed *= -1;
  // }

}
// need to call in loop
function gameLoop()
{
  draw();
  update();

}

function getRandomFood()
{
  var foodX=Math.round(Math.random()*(W-10)/10);
  var foodY=Math.round(Math.random()*(H-10)/10);

  foodColors=["red","green","aqua","coral","orchid"];
  var i=Math.round(Math.random()*foodColors.length);

  var food={
    x:foodX,
    y:foodY,
    color:foodColors[i],
  };

return food;
}

init();
// to call any function repeatly t time
setInterval(gameLoop,100);
