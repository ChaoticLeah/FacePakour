import {
  detectGestures,
  getisNodding,
  MAXROTATIONDIFFERENCE,
  rotationDifference,
} from "./Face_Tracking/gestureDetection.js";
import { setupTracking } from "./Face_Tracking/main.js";
import { showTrackingErrorMessage } from "./Face_Tracking/trackingErrorMessage.js";
import { Player } from "./player.js";
import {
  background,
  fill,
  game,
  height,
  rect,
  resetMousePressed,
  text,
  centerText,
  width,
  setFontSize,
} from "./toolbox.js";

game.start();

setupTracking();

let lastRender = 0;
export let fps = 0;

export let facePositioning;

export let successTracking = false,
  lastSuccessTrack = -1,
  successTrackingTimeout = 1 * 1000;

export let trackingError = false;

export let player = new Player();

export function updateGameArea() {
  var delta = (Date.now() - lastRender) / 1000;
  lastRender = Date.now();
  fps = Math.round(1 / delta);
  game.clear();
  game.frameNo += 1;
  background("white");

  fill("black");
  setFontSize("12", "ee");
  text(`Is_Nodding:` + getisNodding(), 10, 10);
  text(`RotationDifference:` + rotationDifference, 10, 50);

  if (getisNodding()) fill("red");
  else fill("pink");
  //rect(10, 10, 100, 100);
  detectGestures();

  if (!!facePositioning && !!facePositioning.face) {
    successTracking = true;
    lastSuccessTrack = new Date();

    //If there is not currently a tracking error then play the game.
    if (!trackingError) {
      //rect(width / 2 - rotationDifference * 3, height - 50, 40, 40);
      player.run();
      //debug();
    }
  } else {
    successTracking = false;
  }
  player.render();

  //if we cant find a face for a second tell the user there was a tracking error
  if (
    !successTracking &&
    new Date() - lastSuccessTrack > successTrackingTimeout
  ) {
    trackingError = true;
    //console.log("Tracking Error");
  } else {
    trackingError = false;
  }

  if (trackingError) showTrackingErrorMessage();

  resetMousePressed();
}

function getPosX(x) {
  return width - width * (x / (facePositioning.totalWidth + 1));
}

function getPosY(y) {
  return height * (y / (facePositioning.totalHeight + 1));
}

function debug() {
  //Face

  rect(
    facePositioning.face.x,
    facePositioning.face.y - facePositioning.face.r,
    facePositioning.face.r * 2,
    facePositioning.face.r * 2
  );

  fill("blue");
  rect(facePositioning.leftEye.x, facePositioning.leftEye.y, 5, 5);

  rect(facePositioning.rightEye.x, facePositioning.rightEye.y, 5, 5);
}

//Probably not the best implementation but I wanted to try events :)
document.addEventListener("facePos", (e) => {
  //Make sure there is face data
  facePositioning = e.detail;
});
