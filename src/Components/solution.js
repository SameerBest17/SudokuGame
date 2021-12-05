import Grid from "./Grid";
import { Validate } from "./validate";

function findPossibleValues(data, row, col) {
  const availableValuesSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let box = [];
  let peerRow = row > 5 ? 6 : row > 2 ? 3 : 0;
  let peerCol = col > 5 ? 6 : col > 2 ? 3 : 0;
  //console.log(row,col,"peerRwo $ col:",peerRow,peerCol);
  for (let i = 0; i < 9; i++) {
    if (!isNaN(data[row][i].value)) {
      availableValuesSet.delete(data[row][i].value);
    }
    if (!isNaN(data[i][col].value)) {
      availableValuesSet.delete(data[i][col].value);
    }

    if (i === 3 || i === 6) {
      peerRow++;
      peerCol -= 3;
    }
    // console.log("box:", data[peerRow][peerCol].value);
    availableValuesSet.delete(data[peerRow][peerCol].value);
    peerCol++;
  }
  return [...availableValuesSet];
}

// function fillTheEmptyValue(dataNaN, data, dataset) {
//   let newData = data;
//   let newDataset = dataset;
//   let current = 0;
//   let sixe = 0;
//   let row, col;

//   console.log(dataNaN);

//   while (Object.keys(newDataset).length < 81) {
//     if (Validate(newData) === "broken") {
//       console.log("Data", newData);
//       console.log("size", Object.keys(newDataset).length);
//       current--;
//     }
//     if (current < 0 || current > dataNaN.length) {
//       if (Validate(newData) !== "broken") {
//         return true;
//       }
//       current=0;
//     }
//     row = dataNaN[current].row;
//     col = dataNaN[current].col;

//     console.log(row, col);
//     if (newData[row][col].possibleValues.length === 0) {
//       if (!isNaN(newData[row][col].value)) {
//         if (Validate(newData) !== "broken") {
//           current++;
//         } else {
//           current--;
//         }
//       } else {
//         return false;
//       }
//     } else {
//       newData[row][col].value = newData[row][col].possibleValues.shift();
//       newDataset[newData[row][col].name] = newData[row][col].value;
//     }
//     if (sixe > 50) return false;
//     sixe++;
//     current++;
//   }
// }

// Run FindPossibleValues funtion to set each cell possible values
function runFindPossibleValues(data) {
  let dataNaN = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (isNaN(data[i][j].value)) {
        data[i][j].possibleValues = findPossibleValues(data, i, j);
        dataNaN.push({
          row: i,
          col: j,
          size: data[i][j].possibleValues.length,
        });
      }
    }
  }
  return dataNaN;
}

// Set cell if the have onlu one possible value
function setifOnePossibleValue(data, newDataset) {
  let changed = false;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j].possibleValues.length === 1 && isNaN(data[i][j].value)) {
        changed = true;
        newDataset[data[i][j].name] = data[i][j].possibleValues[0];
        data[i][j].value = data[i][j].possibleValues.shift();
      }
    }
  }

  return [newDataset, changed];
}
// function guessMostPossible(row, col, data, newDataset) {
//   data[row][col].value = data[row][col].possibleValues.shift();
//   newDataset[data[row][col].name] = data[row][col].value;
// }

//Main Solution function
export function Solution(puzzeleRows, setPuzzle, dataset, setSolutionMsg) {
  //set Dataset to a new newDateSet variable to be used her in this functions
  let newDataset = dataset;

  //Tell if any changed is made in dataset or not
  let changed = false;

  let data = puzzeleRows;

  var size = 0; // size to end while loop

  while (size < 81) {

    //Data NaN object contains all Nan positions and possible values size for that position 
    const dataNaN = runFindPossibleValues(data);
    [newDataset, changed] = setifOnePossibleValue(data, newDataset);
    if (!changed) {
      //   console.log(changed, "guessing");
      //   console.log(Validate(data));
      //   console.log("ki", dataNaN);
      if (Validate(data) === "Solved") {
        setPuzzle(new Grid(newDataset));
        setSolutionMsg("Solved");
        break;
      }
      else {
        setSolutionMsg("Can not solve current puzzle");
        break
      }
    }
  }
}
