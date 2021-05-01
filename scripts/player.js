import {
  getisNodding,
  rotationDifference,
} from "./Face_Tracking/gestureDetection.js";
import { facePositioning } from "./main.js";
import { getObjectsInArea } from "./objects/objectHandler.js";
import { fill, line, rect, width } from "./toolbox.js";

export class Player {
  x = 100;
  y = 300;
  onGround = true;

  xVel = 0;
  yVel = 0;

  h = 50;
  w = 50;

  constructor() {}

  render() {
    fill("red");
    rect(this.x, this.y, this.w, this.h);
    line(
      this.x + this.w / 2,
      this.y + this.h / 2,
      this.x + this.w / 2 - rotationDifference,
      this.y - 40
    );
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
      } else {
        this.yVel = 0;
      }
    }

    if (
      getObjectsInArea(this.x, this.y, this.w, this.h).filter(
        (e) => e.colladable
      ).length > 0
    ) {
      this.onGround = true;
      if (this.yVel > 0) this.yVel = 0;
    } else {
      this.onGround = false;
    }

    this.x += this.xVel;
    this.y += this.yVel;

    //this.w = facePositioning.face.r;
    //this.h = facePositioning.face.r;
    //this.scale = facePositioning.face.r /
  }
}
