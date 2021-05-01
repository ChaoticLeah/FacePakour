import { facePositioning } from "../main.js";

let isNodding = false,
  successfullNodFrames = 0,
  nodErrorFrameTracker = 0;

const minNodsToCount = 4;
let maxErrors = 36;
let minNodPixes = 0.3;

let lastFramePos = {};

export let rotationDifference;

export const MAXROTATIONDIFFERENCE = 50;

//SHAKING HEAD

let isShakingHead = false;
let lastFrameHeadShake = 0,
  failedShakes = 0,
  framesHeadShook = 0,
  minShakes = 4;

export function detectGestures() {
  if (!!facePositioning && !!facePositioning.face) {
    let eyesAvrgHeight =
      (facePositioning.leftEye.y + facePositioning.rightEye.y) / 2;

    let eyesAvrgVerticle =
      (facePositioning.leftEye.x + facePositioning.rightEye.x) / 2;

    let faceY = facePositioning.face.y;
    let eyeNod = Math.abs(lastFramePos.eyesAvrgVerticle - eyesAvrgVerticle);

    if (
      /*Math.abs(lastFramePos.eyesAvrgVerticle - eyesAvrgVerticle) < 1 &&*/
      eyeNod > minNodPixes &&
      Math.abs(lastFramePos.faceY - faceY) > eyeNod &&
      Math.abs(rotationDifference) < 15
    ) {
      //console.log("passed 1", successfullNodFrames);
      successfullNodFrames++;
      nodErrorFrameTracker--;
    } else {
      nodErrorFrameTracker++;
      if (nodErrorFrameTracker > maxErrors) {
        //console.log("reset");
        nodErrorFrameTracker = 0;
        successfullNodFrames = 0;
      }
    }

    if (successfullNodFrames > minNodsToCount) {
      //console.log("NODDING");
      isNodding = true;
    } else {
      isNodding = false;
    }

    lastFramePos = {
      eyesAvrgHeight: eyesAvrgHeight,
      eyesAvrgVerticle: eyesAvrgVerticle,
      faceY: faceY,
    };

    //DETECT eye difference

    rotationDifference = facePositioning.leftEye.y - facePositioning.rightEye.y;

    if (
      lastFrameHeadShake > 0 ? rotationDifference < 0 : rotationDifference > 0
    )
      if (Math.abs(rotationDifference - lastFrameHeadShake > 1)) {
        framesHeadShook++;
        failedShakes -= 6;
      } else {
        //framesHeadShook--;
        failedShakes++;
        if (failedShakes > maxErrors) {
          failedShakes = 0;
          framesHeadShook = 0;
        }
      }
    if (framesHeadShook > minShakes) {
      //console.log("nodders");
      isShakingHead = true;
      framesHeadShook = 0;
    } else {
      isShakingHead = false;
    }
    //console.log(framesHeadShook);

    lastFrameHeadShake = rotationDifference;
  }
}

export function getisNodding() {
  return isNodding;
}
