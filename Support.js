function mm2px(valueMM, ppi) {
  // Convert mm to pixels
  const valuePx = valueMM * (ppi / 25.4);
  return valuePx;
}

// Für das iPad Pro 12,9 Zoll (5. Generation) mit 264 PPI
const ipadProPPI = 264;
const valueInMM = 10; // Beispielwert in Millimetern
const valueInPixels = mm2px(valueInMM, ipadProPPI);
console.log(valueInPixels); // Ausgabe des Wertes in Pixeln für das iPad Pro 12,9 Zoll (5. Generation)
