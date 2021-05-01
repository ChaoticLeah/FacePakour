import { intersects } from "../toolbox.js";
import { GameObject } from "./GameObject.js";

export let objects = [];

export function getObjects() {
  return objects;
}

export function getObjectsInArea(x, y, w, h) {
  let objs = [];
  objects.forEach((obj) => {
    if (intersects(x, y, w, h, obj.x, obj.y, obj.w, obj.h)) {
      objs.push(obj);
    }
  });
  return objs;
}

export function addPlatform(x, y, w, h) {
  objects.push(new GameObject(x, y, w, h));
}

export function handleObjects() {
  for (let i = 0; i < objects.length; i++) {
    objects[i].run();
    objects[i].render();
  }
}
