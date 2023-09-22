/* mm2px(valueMM){
  const ppi =  132; // PPI des iPad Pro 12,9 Zoll (5. Generation)
  // Convert mm to pixels
  const valuePx = valueMM * (ppi / 25.4);
  return valuePx;
}
*/
// Calculate the radius in pixels
function mm2px(valueMM){

  // Get the PPI of the screen
  const ppi = window.devicePixelRatio * 96; // assuming a default DPI of 96
  // Convert  mm to pixels
  const valuePx = valueMM * (ppi / 25.4);
  return valuePx;
}