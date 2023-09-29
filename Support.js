/* mm2px(valueMM){
  const ppi =  132; // PPI des iPad Pro 12,9 Zoll (5. Generation)
  // Convert mm to pixels
  const valuePx = valueMM * (ppi / 25.4);
  return valuePx;
  //Auflösung von 2732 x 2048.. Pixels in mm sollte 25,4/PPI sein (=25,4/365 ) = 0.096mm
}
*/
// Calculate the radius in pixels
function mm2px(valueMM){

  // Get the PPI of the screen
  const ppi = window.devicePixelRatio * 92; // assuming a default DPI of 96
  // Convert  mm to pixels
  const valuePx = valueMM * (ppi / 25.4);
  const pixelSizeMM = 25.4 / ppi;
  console.log("One pixel in mm:" + pixelSizeMM);
  return valuePx;
}

function resizeCanvas() {
  const canvas = document.getElementById('trialCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}