class ExperimentFrame {
  constructor() {
    this.blockNumber = 1;
    this.trialNumber = 1;
    this.loggedData = [];
    this.personId = this.generatePersonId(); 
    this.experiment = new Experiment();
    this.totalBlocks = this.experiment.getNumBlocks(); // Track the total number of blocks
    // Set the number of trials per break
    this.trialsPerBreak = 2;
  }

  generatePersonId() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    const uniqueId = randomLetter + randomNumber.toString().padStart(2, '0');
    return uniqueId;
  }

  // Show only the target and start rectangles on the screen
  showTrial() {
    
    const trial = this.experiment.getBlock(this.blockNumber).getTrial(this.trialNumber);
    if (!this.printedFirstBlock) {

      this.printedFirstBlock = true;
      this.printAllTrials();
    }

    const STRectDrawing = new STRectsDrawing(trial, this.trialNumber, this.experiment.rectSize, this.personId, this.experiment.numRects, this.loggedData,  () => {
      this.trialCompleted();
    });

    //add time out that canvas can be centered
    setTimeout(() => {
      this.showIndexes();
      STRectDrawing.showRects();
    }, 50);

    this.showIndexes();
    STRectDrawing.showRects();

    // Check if it's time for a break
    if (this.trialNumber % this.trialsPerBreak === 1 && this.trialNumber !== 1)

        {
    // Display the break window
        this.displayBreakWindow(); 
        }
  }

    // Function to display the break window
  displayBreakWindow() {
      // Get the break window modal
    const breakWindow = document.getElementById('breakWindow');
    // Show the modal
    breakWindow.style.display = 'block';

    // Disable the rest of the page interaction while the break window is visible
    document.body.style.pointerEvents = 'none';

    // Get the continue button
    const continueButton = document.getElementById('continueButton');

    // Event listener for the continue button
    continueButton.addEventListener('click', () => {
      // Hide the break window modal
      breakWindow.style.display = 'none';

      // Enable the page interaction again
      document.body.style.pointerEvents = 'auto';
    });
  }

  trialCompleted() {
    const currentBlock = this.experiment.getBlock(this.blockNumber);
  
    if (currentBlock) {
      if (currentBlock.hasNext(this.trialNumber)) {
        this.getNextTrial();
      } else if (this.blockNumber !== this.totalBlocks) {
        this.getNextBlock();
      } else {
        // Letzter Block und letzter Trial abgeschlossen
        this.experimentFinished();
      }
    } else {
      console.error("Ungültige Blocknummer:", this.blockNumber);
    }
  }

   
  

  getNextTrial() {
    this.trialNumber++;
    this.showTrial();
  }

  getNextBlock() {
    this.blockNumber++;
    this.trialNumber = 1;
    this.showTrial();
  }

  showIndexes() {
    const currentTrialIndexEl = document.getElementById("currentTrialIndex");
    currentTrialIndexEl.innerText = this.trialNumber;

    const currentBlockIndexEl = document.getElementById("totalTrialsIndex");
    currentBlockIndexEl.innerText = this.getTotalTrials();
    
    const  trialsToBlockIndexEI= document.getElementById("trialsToBreakIndex");
    trialsToBlockIndexEI.innerText = this.getRemainingTrials();
  }

  experimentFinished() {
    const isLastBlock = this.blockNumber === this.totalBlocks;
  
    if (isLastBlock) {
      if (this.loggedData.length > 0) {
        console.log(this.loggedData); // Überprüfen Sie, ob das Array Daten enthält
        this.generateCSVFile();
        alert("Die Aufgaben sind abgeschlossen. Das CSV-Datei-Generierungsfenster wird angezeigt. Bitte schließen Sie das Fenster manuell.");
      } else {
        alert("Es liegen keine Daten zum Generieren der CSV-Datei vor.");
      }
    }
 
  }

  getTotalTrials() {
    let totalTrials = 0;
    for (let i = 0; i < this.experiment.getNumBlocks(); i++) {
      const block = this.experiment.getBlock(i + 1);
      totalTrials += block.trialsNum;
    }
    return totalTrials;
  }

  getRemainingTrials(){
    //const remainingTrialsToBreak = this.trialsPerBreak - (this.trialNumber % this.trialsPerBreak);
    const remainingTrialsToBreak = this.trialsPerBreak - ((this.trialNumber - 1) % this.trialsPerBreak);

    return remainingTrialsToBreak;
  }

  // print all of the trials on the console
  printAllTrials() {
    for (let i = 0; i < this.experiment.getNumBlocks(); i++) {
      const block = this.experiment.getBlock(i + 1);
      
      for (let j = 0; j < block.trialsNum; j++) {
        const trial = block.getTrial(j + 1);
        console.log(trial);
      }
    }
  }

  convertToCSV(data) {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj => {
      const values = Object.values(obj).map(value => {
        if (typeof value === "string") {
          return `"${value}"`; // Wrap string values in quotes
        }
        return value;
      });
      return values.join(",");
    });
    return `${headers}\n${rows.join("\n")}`;
  }

   
  
  generateCSVFile() {
    const csv = this.convertToCSV(this.loggedData);


    // Create a Blob with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create a download URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and set its attributes
    const link = document.createElement("a");
    link.href = url;
    link.download = "task_data.csv";

    // Simulate a click on the link element to trigger the download
    link.click();
  }

}
