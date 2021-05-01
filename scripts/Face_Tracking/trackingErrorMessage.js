import {
  background,
  centerText,
  fill,
  height,
  setFontSize,
  text,
  width,
} from "../toolbox.js";

export function showTrackingErrorMessage() {
  background(`rgba(255,0,0,0.4)`);
  fill("white");
  setFontSize("100", "ee");
  text("Tacking Lost", centerText("Tracking Lost", 0, width), height / 2);
  setFontSize("20", "ee");
  let txt =
    "Make sure your camera can see you(and nothing obstucting your face), and your room is well lit.";
  text(txt, centerText(txt, 0, width), height / 2 + 50);
}
