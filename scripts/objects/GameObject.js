import { fill, rect } from "../toolbox.js";

export class GameObject {
  x;
  y;
  w;
  h;
  colladable = true;
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  render() {
    fill("black");
    rect(this.x, this.y, this.w, this.h);
  }

  run() {}
}
