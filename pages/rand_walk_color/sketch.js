// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walkers = [];
let numWalkers = 1000;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for(var i = 0; i < numWalkers; i++) {
    walkers[i] = new Walker();
  }
  background(220);
}

function draw() {
  fill(220, 4);
  rect(0,0,width,height);
  for(var i = 0; i < numWalkers; i++) {
    walkers[i].step();
    walkers[i].render();
  }
}

class Walker {
  constructor(){
    // This sets the start point to somewhere in the middle third
    //this.x = width/3 + random(width/3);
    //this.y = height/3 + random(height/3);
    this.x = width/2;
    this.y = height/2;
    this.x_vel = 0;
    this.y_vel = 0; 
    while(this.x_vel == 0 || this.y_vel == 0) {
      this.x_vel = -2 + floor(random(4));
      this.y_vel = -2 + floor(random(4));
    }
    this.color_r = floor(random(255));
    this.color_g = floor(random(255));
    this.color_b = floor(random(255));
  }

  render() {
    stroke(this.color_r, this.color_g, this.color_b);
    point(this.x,this.y);
  }

  step() {
    // A 3/8 chance of changing directions
    var choice = floor(random(8));
    if (choice === 0) {
      this.x_vel = -1 * this.x_vel
    } else if (choice == 1) {
      this.y_vel = -1 * this.y_vel
    } else if (choice == 2) {
      this.y_vel = -1 * this.y_vel
      this.x_vel = -1 * this.x_vel
    } 
    this.x = this.x + this.x_vel;
    this.y = this.y + this.y_vel;

    this.x = constrain(this.x,0,width-1);
    this.y = constrain(this.y,0,height-1);
  }
}
