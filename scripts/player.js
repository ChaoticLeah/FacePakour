import {
  getisNodding,
  rotationDifference,
} from "./Face_Tracking/gestureDetection.js";
import { facePositioning } from "./main.js";
import { fill, rect, width } from "./toolbox.js";

export class Player {
  x = 100;
  y = 300;
  onGround = true;

  xVel = 0;
  yVel = 0;

  h = 50;
  w = 50;
  scale = 0;
  constructor() {}

  render() {
    fill("red");
    rect(this.x, this.y, this.w, this.h);
  }

  run() {
    this.xVel =
      -(Math.abs(rotationDifference) < 8 ? 0 : rotationDifference) / 2;

    if (!this.onGround) {
      this.yVel += 1;
    } else {
      //If we are on the ground let the player jump!
      if (getisNodding()) {
        this.yVel = -20;
      }

      this.y -= this.y + this.xVel + this.h - 500;
      if (this.yVel > 0) {
        this.yVel = 0;
      }
    }

    //Get onGround
    if (this.y + this.xVel + this.h > 500) this.onGround = true;
    else this.onGround = false;
    if (this.y + this.xVel > 500) fill("purple");
    rect(0, 500, width, 10);

    this.x += this.xVel;
    this.y += this.yVel;

    this.w = facePositioning.face.r;
    this.h = facePositioning.face.r;
    //this.scale = facePositioning.face.r /
  }
}
