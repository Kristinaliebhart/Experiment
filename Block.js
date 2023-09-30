class Block {
  constructor(blockNumber, experimentType, shape, intDevice, rectsize, startSize, numRects ) {
    this.shape = shape;
    this.targetHeight = [15,10,];
    this.targetWidth = [5,8,];
    this.amplitude = [60];
    this.trialDirection = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.intDevice = intDevice;
    this.blockNumber = blockNumber;
    this.experimentType = experimentType;
    this.startSize = startSize;
    this.numRects = numRects;
    this.rectsize = rectsize;
    this.trialId = 0;
    this.currentstartIndex = null;
    this.currentTargetIndex = null;
    this.trialsNum = this.targetWidth.length * this.trialDirection.length * this.amplitude.length;
    this.usedIndices = [];
    this.rectIndices = [];

    for (let i = 0; i < this.numRects; i++) {
      this.rectIndices.push(i);
    }

    this.trials = [];

    for (var i = 0; i < this.targetWidth.length; i++) {
      for (var k = 0; k < this.amplitude.length; k++) {
        for (var j = 0; j < this.trialDirection.length; j++) {

          this.startIndex = j + 1;
          this.targetIndex = (j + 6) % 12 + 1; 

          const trial = new Trial(
            this.trialId,
            this.shape,
            this.trialDirection[j],
            this.intDevice,
            this.startIndex,
            this.targetIndex,
            this.startSize,
            this.targetWidth[i],
            this.targetHeight[i],
            this.amplitude[k]
          );

          this.trials.push(trial);
          this.trialId++;
        }
      }
    }

    // Shuffle the trials array randomly
    this.shuffleArray(this.trials);
  }

// return trial
  getTrial(trialNumber) {
    return this.trials[trialNumber - 1];
  }
  generateTrials() {

   //check and remove duplicates
    const uniqueTrials = this.removeDuplicates(this.trials);

    // shuffle trials
    this.shuffleArray(uniqueTrials);
    this.trials = uniqueTrials;
  }

  removeDuplicates(trials) {
    const uniqueTrials = [];
    const trialsSet = new Set();

    for (const trial of trials) {
      const trialKey = this.getTrialKey(trial);

      if (!trialsSet.has(trialKey)) {
        uniqueTrials.push(trial);
        trialsSet.add(trialKey);
      }
    }

    return uniqueTrials;
  }

  getTrialKey(trial) {
    return `${trial.startIndex}-${trial.targetIndex}-${trial.startSize}-${trial.targetWidth}-${trial.targetHeight}-${trial.amplitude}`;
  }

  //check if the block has another trial
  hasNext(trialNumber) {
    return this.trialsNum - trialNumber > 0;
  }

// Shuffling function using Fisher-Yates algorithm
shuffleArray(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

}





