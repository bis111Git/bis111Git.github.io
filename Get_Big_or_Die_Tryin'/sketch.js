var blob = [];
var gameOn = 0;
let time;
let bg;

function setup() {
  time = 0
  bg = loadImage('Esla-VM-1024.jpg');
  createCanvas(1024, 576);
  for (let i = 0; i < 10; i++) {
    blob[i] = new Blob(random(0, 400), random(0, 400), random(10, 70), random(0, 255), random(0, 255), random(0, 255), 100, random(0, 360))
  }
  eater = new Eater(width / 2, height / 2, 21, 0, 0, 0, 250, 0)
  

}

class Blob {
  constructor(xIn, yIn, sIn, rIn, gIn, bIn, aIn, graderIn) {
    this.x = xIn //x-position
    this.y = yIn //y-position
    this.s = sIn //size
    this.r = rIn //red-value
    this.g = gIn //green-value
    this.b = bIn //blue-value
    this.a = aIn //alpha
    this.grader = graderIn //degrees
  }

  draw() {
    fill(this.r, this.g, this.b, this.a)
    ellipse(this.x, this.y, this.s)
  }
  move(endring) {
    this.grader = this.grader + endring
    this.x = this.x + cos(radians(this.grader))
    this.y = this.y - sin(radians(this.grader))
    if (this.x < 0) {
      this.x = width - 1
    };
    if (this.y < 0) {
      this.y = height - 1
    };
    this.x = this.x % width
    this.y = this.y % height
  }
}

class Eater extends Blob {
  constructor(xIn, yIn, sIn, rIn, gIn, bIn, aIn, graderIn) {
    super(xIn, yIn, sIn, rIn, gIn, bIn, aIn, graderIn)
    this.turn = 0.5 * blob.length
    this.speed = 2
  }

  move() {
    if (keyIsPressed === true) {
      if (keyCode === LEFT_ARROW) {
        eater.grader += this.turn
      } else if (keyCode === RIGHT_ARROW) {
        eater.grader += -this.turn;
      }
    }

    this.x += cos(radians(this.grader)) * this.speed
    this.y -= sin(radians(this.grader)) * this.speed
    if (this.x < 0) {
      this.x = width - 1
    };
    if (this.y < 0) {
      this.y = height - 1
    };
    this.x = this.x % width
    this.y = this.y % height
  }
  checkCollision(i) {
    if (dist(eater.x, eater.y, blob[i].x, blob[i].y) < ((blob[i].s + eater.s) / 2)) {
      if (eater.s > blob[i].s) {
        eater.s += round(TWO_PI*blob[i].s/eater.s)
        blob.splice(i, 1)
        //this.turn -= 0.5
        //this.speed += 0.2
      } else {
        this.s = 0
      }
    }
  }

}

function checkVictory() {
  if (blob.length == 0) {
    background(220)
    textSize(60)
    textAlign(CENTER);
    text("Victory!", width / 2, height / 2)
    gameOn = 0
  }
  if (eater.s == 0) {
    background(220)
    textSize(60)
    textAlign(CENTER);
    fill(0, 0, 0)
    text("Game Over", width / 2, height / 2)
    gameOn = 0
  }

}

function introScreen() {
  textSize(25)
  textAlign(CENTER);
  fill(0, 0, 0)
  text("Eat the small blobs, and don't get eaten", width / 2, height / 2 - 50)
  text("Change angle with arrow keys", width / 2, height / 2)
  text("Press any key to begin", width / 2, height / 2 + 50)
  if (keyIsPressed === true) {
    gameOn = 1
    blob = []
    setup()
  }
}

function drawScore(){
    
    textSize(20)
    textAlign(CENTER);
    fill(0, 0, 0)
    text("Score:", 40, 20)
    text(round(time/20), 85, 20)
}

function createNewBlob(){
  if (time%100 == 99){
    blob.push(new Blob(random(0, 400), random(0, 400), random(10, 50), random(0, 255), random(0, 255), random(0, 255), 100, random(0, 360)) )
  }

}

function draw() {
  background(250,226,200)
  if (gameOn == 1) {
    eater.move()
    for (let i = 0; i < blob.length; i++) {
      blob[i].draw()
      blob[i].move(random(-5, 5))
      eater.checkCollision(i)
    }
    eater.draw()
    //drawScore()
    time += 1
    checkVictory()
    createNewBlob()
  } else {
    introScreen()
    checkVictory()
  }
  

}