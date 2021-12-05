import Cell from "./Cell";

// Function to Create Sudoku Borad using cell data and rest Api
export default class Grid {
  constructor(mode) {
    let currentRow;
    this.rows = [];
    let charValue = 64;
    let cellNumber = 1;

    for (let box = 0; box < 81; box++, cellNumber++) {
      if (box % 9 === 0) {
        //  console.log(currentRow);
        currentRow = [];
        charValue++;
        cellNumber = 1;
        this.rows.push(currentRow);
      }
      //Create unique cell name as given in apis
      let cellName = String.fromCharCode(charValue) + cellNumber;

      currentRow.push(new Cell(cellName, mode[cellName]));
    }
  }

  getRows() {
    return this.rows;
  }
}
