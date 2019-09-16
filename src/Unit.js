export class Unit {

    constructor(unitPoints, bonusCount, bonusPoints, counter, score, id) {
        this.score = score;
        this.counter = counter;
        this.unitPoints = unitPoints;
        this.bonusCount = bonusCount;
        this.bonusPoints = bonusPoints;
        this.id = id
    }

    // adds items and calculcate if bonus or not
    add() {
        this.counter++; // 1
        this.score += this.unitPoints; // 30
        if ( (this.counter % this.bonusCount) === 0) {
            this.score += this.bonusPoints; // 30 + 90 = 120
            this.score -= this.unitPoints * this.bonusCount; // theloume number of B
        }
    }
}
export const addItem = (id) => {
    return hm[id].add()
}
export const hm = {
    'A': new Unit(50, 3, 200, 0, 0, "A"),
    'B': new Unit(30, 2, 90, 0, 0, "B"),
    'C': new Unit(20, 0, 0, 0, 0, "B"),
    'D': new Unit(15, 0, 0, 0, 0, "B"),
};
 export const getTotalScore = () => {
        // hm[id].add()
    
    //  userInput.forEach(({id}) => {
       
    //   });
      
      const totalscore = Object.keys(hm).reduce(
        (acc, k) => acc + hm[k].score, 
        0
      );
      return totalscore;
}


































