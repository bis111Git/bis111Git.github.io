var Engine = Matter.Engine,
  World = Matter.World,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;

let engine;
let world;
let boxes = [];
let grounds = [];
let mConstraint;

let canvas;

function setup() {
  canvas = createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  
  grounds.push(new Boundary(0, height / 2, 20, height));
  grounds.push(new Boundary(width, height / 2, 20, height));
  grounds.push(new Boundary(200, 0, width, 20));
  grounds.push(new Boundary(width/2, height, width, 20));
  World.add(world, grounds);
  
  for (let i = 0; i < 10; i++) {
    boxes.push(new Box( random(0,width), random(0,height/2), 40, 40));
  }

  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity() // for retina displays etc
  let options = {
    mouse: mouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}
 
function draw() {
  background(240);


  Engine.update(engine);
  for (let box of boxes) {
    box.show();
  }
  
  for (let ground of grounds) {
    ground.show();
  }
}
