class STRectsDrawing {
  constructor(trial, trialNumber, Size, personId, nums, loggedData, onTargetClicked) {
    this.shape = trial.shape;
    this.startClicked = false;
    this.isTargetClicked = false;
    this.startIndex = trial.startIndex;
    this.targetIndex = trial.targetIndex;
    this.nums = nums;
    this.loggedData = loggedData;
    this.amplitude = trial.amplitude;
    this.startSize = trial.startSize;
    this.targetWidth = trial.targetWidth;
    this.targetHeight = trial.targetHeight;
    this.Size = Size;
    this.trialId = trial.trialId;
    this.trialDirection = trial.trialDirection;
    this.onTargetClicked = onTargetClicked;
    this.handleCanvasClick = this.handleCanvasClick.bind(this);
    this.trialNumber = trialNumber;
    this.intDevice = trial.intDevice;
    this.personId = personId; //for each person a unique id
    this.startTime = null;
    this.endTime = null;
    this.wrongClicks = 0;
    this.positionClock = 'centered'; // 'random'; 
  
  }

  getDirection(startIndex) {
    if ([12, 1, 2].includes(startIndex)) {
      return 'left';
    } else if ([3, 4, 5].includes(startIndex)) {
      return 'up';
    } else if ([6, 7, 8].includes(startIndex)) {
      return 'right';
    } else if ([9, 10, 11].includes(startIndex)) {
      return 'down';
    } else {
      return 'unknown';
    }
  }

   calculateEuclideanDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  generatePersonId() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    const uniqueId = randomLetter + randomNumber.toString().padStart(2, '0');
    return uniqueId;
  }

  showRects() {
    const canvas = document.getElementById("trialCanvas");
    const context = canvas.getContext("2d");
  
    let startSizePx = 0;
  
    let startX = 0;
    let startY = 0;
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    canvas.removeEventListener("click", this.handleCanvasClick);
    canvas.addEventListener("click", this.handleCanvasClick);
  
    
   // Mittelpunkt des Canvas zeichnen
    let centerX, centerY; 
    if (this.positionClock === 'centered') {
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
    } else if (this.positionClock === 'random') {
      //TODO: implement logic for random position
    }
  
    const centerSize = 5; // Größe des Mittelpunkts
  
    context.fillStyle = "red"; // Farbe des Mittelpunkts TODO: später löschen
    context.fillRect(centerX - centerSize / 2, centerY - centerSize / 2, centerSize, centerSize);
  
    const amplitudePx = mm2px(this.amplitude);
    const angle = (2 * Math.PI) / 12; // Änderung: Wir teilen den Kreis in 12 Positionen auf
  
    context.strokeStyle = "black";
  
    startSizePx = mm2px(this.startSize);
  
    const startColor = "rgba(144, 238, 144, 0.8)";
    context.fillStyle = startColor;
  
    startX = centerX + amplitudePx * Math.cos((this.startIndex - 1) * angle);
    startY = centerY + amplitudePx * Math.sin((this.startIndex - 1) * angle);
  
    if (this.shape === "rectangle") {
      context.strokeRect(
        startX - startSizePx / 2,
        startY - startSizePx / 2,
        startSizePx,
        startSizePx
      );
      context.fillRect(
        startX - startSizePx / 2,
        startY - startSizePx / 2,
        startSizePx,
        startSizePx
      );
    } else if (this.shape === "circle") {
      context.beginPath();
      context.arc(startX, startY, startSizePx / 2, 0, 2 * Math.PI);
      context.stroke();
      context.fill();
    }
  
    const targetColor = "rgba(255, 102, 102, 0.8)";
    context.fillStyle = targetColor;
  
    const targetX = centerX + amplitudePx * Math.cos((this.targetIndex - 1) * angle);
    const targetY = centerY + amplitudePx * Math.sin((this.targetIndex - 1) * angle);
  
    if (this.shape === "rectangle") {
      this.targetWidthPx = mm2px(this.targetWidth);
      this.targetHeightPx = mm2px(this.targetHeight);
  
      context.strokeRect(
        targetX - this.targetWidthPx / 2,
        targetY - this.targetHeightPx / 2,
        this.targetWidthPx,
        this.targetHeightPx
      );
      context.fillRect(
        targetX - this.targetWidthPx / 2,
        targetY - this.targetHeightPx / 2,
        this.targetWidthPx,
        this.targetHeightPx
      );
    } else if (this.shape === "circle") {
      const targetSize = mm2px(this.targetWidth);
      context.beginPath();
      context.arc(targetX, targetY, targetSize / 2, 0, 2 * Math.PI);
      context.stroke();
      context.fill();
    }
  
    this.printToConsole();
  }
  
  handleCanvasClick(event) {
    const canvas = document.getElementById("trialCanvas");
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const amplitudePx = mm2px(this.amplitude);
    const angle = (2 * Math.PI) / 12; // Änderung: Wir teilen den Kreis in 12 Positionen auf
  
    const startX = centerX + amplitudePx * Math.cos((this.startIndex - 1) * angle);
    console.log("StartX" + startX);
    const startY = centerY + amplitudePx * Math.sin((this.startIndex - 1) * angle);
    const targetX = centerX + amplitudePx * Math.cos((this.targetIndex - 1) * angle);
    const targetY = centerY + amplitudePx * Math.sin((this.targetIndex - 1) * angle);

    //TODO: später diesse 4 Zeilen löschen und beim Loggen von sxmid Math.round anwenden
    //bzw. eventuell mehr Nachkommastellen loggen.

  
    const Sxmid = Math.round(startX);
    const Symid = Math.round(startY);
    const Txmid = Math.round(targetX);
    const Tymid = Math.round(targetY);

    const midStartX = startX;
    const midStartY = startY;
    const midTargetX =targetX;
    const midTargetY = targetY;
   
  
    const startPx = mm2px(this.startSize);
    const targetWidthPx = mm2px(this.targetWidth);
    const targetHeightPx = mm2px(this.targetHeight);
  
    const distanceToTarget = Math.sqrt((x - targetX) ** 2 + (y - targetY) ** 2);
    const distanceToStart = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
  
    if (!this.startClicked && distanceToStart < startPx / 2) {
      this.startTime = new Date();
      context.fillStyle = "rgba(0, 0, 139, 0.8)";
  
      context.beginPath();
      if (this.shape === "rectangle") {
        context.fillRect(
          targetX - targetWidthPx / 2,
          targetY - targetHeightPx / 2,
          targetWidthPx,
          targetHeightPx
        );
      } else if (this.shape === "circle") {
        const startSizePx = mm2px(this.startSize) / 2;
        context.arc(startX, startY, startSizePx, 0, 2 * Math.PI);
        context.fill();
      }
  
      this.startPixelX = x; // Verwenden Sie die äußere Variable
      console.log("StartPixelX" + this.startPixelX);
     
      this.startPixelY = y; // Verwenden Sie die äußere Variable
      this.startClicked = true;
    } else if (this.startClicked) {
      if (!this.isTargetClicked && distanceToTarget < targetWidthPx / 2) {
        this.endTime = new Date();
        context.beginPath();
        if (this.shape === "rectangle") {
          context.fillStyle = "rgba(0, 0, 139, 0.8)";
          context.fillRect(
            targetX - targetWidthPx / 2,
            targetY - targetHeightPx / 2,
            targetWidthPx,
            targetHeightPx
          );
        } else if (this.shape === "circle") {
          context.fillStyle = "rgba(0, 0, 139, 0.8)";
          context.arc(targetX, targetY, targetWidthPx / 2, 0, 2 * Math.PI);
          context.fill();
        }
        const targetPixelX = x;
        const targetPixelY = y;
  
        this.logData(this.startPixelX, this.startPixelY, targetPixelX, targetPixelY, midStartX, midStartY, midTargetX, midTargetY, Sxmid, Symid, Txmid, Tymid);
        this.onTargetClicked();
        this.isTargetClicked = true;
      } else {
        this.wrongClicks++;
      }
    }
  }
     
  getClickOutcome() {
    return this.wrongClicks === 0 ? "correct" : "wrong";
  }

  logData(startPixelX, startPixelY, targetPixelX, targetPixelY, midStartX, midStartY, midTargetX, midTargetY, Sxmid,Symid,Txmid,Tymid) {

   


    const data = {
      trialNumber: this.trialNumber,
      personId: this.personId,
      // trialDirection: this.trialDirection,
      startIndex: this.startIndex,
      targetIndex: this.targetIndex,
      targetWidth: this.targetWidth,
      targetHeight: this.targetHeight,
      shape: this.shape,
      intDevice: this.intDevice,
      amplitude: this.amplitude,
      duration: (this.endTime - this.startTime) / 1000,
      wrongClicks: this.wrongClicks,
      direction: this.getDirection(this.startIndex),
      ClickOutcome: this.getClickOutcome(),
      startPixelX: startPixelX,
      startPixelY: startPixelY,
      targetPixelX: targetPixelX,
      targetPixelY: targetPixelY,
      startX: Sxmid,
      startY: Symid,
      targetX: Txmid,
      targetY: Tymid,
      EuclideanDistanceClickedPx: this.calculateEuclideanDistance(startPixelX, startPixelY, targetPixelX, targetPixelY).toFixed(2),
      EuclideanDistancMidPx: this.calculateEuclideanDistance(midStartX, midStartY, midTargetX, midTargetY).toFixed(2)
    
      
    };
  
    this.loggedData.push(data); // add data to array
  }

  printToConsole(){
    console.log(
      "Information from Drawing: " +

        "Person ID: " +
        this.personId +
        " | Trial Number: " + 
        this.trialNumber +
        " | Trial ID: " +
        this.trialId +
        " | Shape: " +
        this.shape +
        " | Interaction Device: " +
        this.intDevice +
        " | Start Size: " +
        this.startSize +
        " | Start Index: " +
        this.startIndex +
        " | Target Index: " +
        this.targetIndex +
        " | Amplitude: " +
        this.amplitude +
        " | Target Width: " +
        this.targetWidth +
        " | Target Height: " +
        this.targetHeight +
        " | Trail Direction: " +
        this.trialDirection
    );
  }
  
}

