const checkForNull = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (isNaN(data[i].value)) {
     // console.log(data[i].value);
      return true;
    }
  }

  return false;
};

function checkIfDuplicateExists(arr) {
  // console.log(arr);
  return new Set(arr).size !== arr.length;
}

// function checkdup(data) {
//   const err = [];
//   data.forEach(function (item, index) {
//     console.log(item,index);
//     if (data.indexOf(item) !== index) {
//       err.push(index);
//       err.push(data.indexOf(item));
//       return
//     }
//   });
//   const dup = data.filter((item, index) => data.indexOf(item) !== index);
//   console.log(err);
// }

export function getCellValues(data) {
  return data
    .filter(function (cell) {
      return !isNaN(cell.value);
    })
    .map(function (cell) {
      return cell.value;
    });
}
function getColumns(data, i) {
  
  let columns = [];
  for (let j = 0; j < 9; j++) {
    columns.push(data[j][i]);
  }
  return columns;
}

export function getSubGrid(data, i) {
 
  let box = [];
  let row = i > 5 ? 6 : i > 2 ? 3 : 0;
  let col =
    i === 0 || i === 3 || i === 6 ? 0 : i === 1 || i === 4 || i === 7 ? 3 : 6;
  for (let i = 0; i < 9; i++) {
    if (i === 3 || i === 6) {
      row++;
      col -= 3;
    }
    box.push(data[row][col]);

    col++;
  }
  return box;
}
export function Validate(data) {
  let nullCell=false;
  for (let i = 0; i < 9; i++) {
    // Check rows Duplicates
    if (checkIfDuplicateExists(getCellValues(data[i]))) {
      return "broken";
    }
    // Get cols
    let column = getColumns(data, i);
    //Check columns Duplicates
    if (checkIfDuplicateExists(getCellValues(column))) {
      return "broken";
    }

    const box = getSubGrid(data, i);
    //  checkdup(getCellValues(box));

    //Check SubGrids Duplicates
    if (checkIfDuplicateExists(getCellValues(box))) {
      return "Broken";
    }

    if (checkForNull(data[i])) {
      nullCell=true;
    }
  }
  if(nullCell) {return "unSolved";}
  return "Solved";
}
