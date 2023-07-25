
// Calculate the radius in pixels
function mm2px(valueMM){

  // Get the PPI of the screen

//for ipad: alles löschen außer das in den /* */
// const dpi = 265;
//resolution: 2048x2732
//inches: 12.9

/*  const ppi = 265; // set the dpi to 265
  const inches = valueMM / 25.4; // convert mm to inches
  const valuePx = inches * ppi * window.devicePixelRatio; // calculate pixels
  return valuePx;
  */

  const ppi = window.devicePixelRatio * 96; // assuming a default DPI of 96
  // Convert  mm to pixels
  const valuePx = valueMM * (ppi / 25.4);
  return valuePx;
}

//test

