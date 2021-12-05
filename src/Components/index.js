import Grid from "./Grid";
import { Solution } from "./solution";

import { React, useState, useEffect } from "react";
import { Validate } from "./validate";

//Create Squares for given Rpws
const Square = ({ value, cellName, onCellValueChange }) => (
  <input
    type="text"
    value={value === 0 ? "" : value}
    maxLength="1"
    onChange={(evt) => {
      const cellValue = evt.target.value;
      if (parseInt(cellValue, 10) || cellValue === "") {
        onCellValueChange(cellName, cellValue);
      }
    }}
  />
);

//Create full board using square function
const SudukoBoard = ({ puzzleGrid, onCellValueChange }) => {
  return (
    <table className="sudoku">
      <tbody>
        {puzzleGrid.rows.map((row, idx) => (
          <tr key={idx}>
            {row.map((cell) => (
              <td key={cell.name}>
                <Square
                  value={isNaN(cell.value) ? 0 : cell.value}
                  cellName={cell.name}
                  onCellValueChange={onCellValueChange}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Sudoku({
  dataset,
  toggle,
  setdata,
  settoggle,
  setmode,
  mode,
}) {
  const [puzzle, setPuzzle] = useState(new Grid(dataset));
  const [validation, setvalidation] = useState("none");
  const [solutionMsg, setSolutionMsg] = useState("");

  useEffect(() => {
    setSolutionMsg(validation);
    console.log("mounted", dataset);
    if (dataset) {
      console.log("data :", dataset);
      setPuzzle(new Grid(dataset));
    }
  }, [dataset]);

  function random() {
    const array = ["easy", "medium", "hard"];
    var rand = Math.floor(Math.random() * 3);
    return array[rand];
  }
  function onCellValueEdited(cellName, cellValue) {
    const newdata = dataset;
    newdata[cellName] = cellValue;
    //  console.log(dataset, cellName, cellValue)
    setPuzzle(new Grid(newdata));
  }
  return (
    <div className="game">
      <h1>Sudoku </h1>
      <SudukoBoard puzzleGrid={puzzle} onCellValueChange={onCellValueEdited} />
      <div id="outer">
        <div className="buttons">
        <p className="inner">Levels:</p>
          <button
            className="inner"
            onClick={() => {
              //  setdata([]);
              settoggle(!toggle);
              setmode("easy");
            }}
          >
            Easy
          </button>
          <button
            className="inner"
            onClick={() => {
              //   setdata([]);
              settoggle(!toggle);
              setmode("medium");
            }}
          >
            Medium
          </button>
          <button
            className="inner"
            onClick={() => {
              //  setdata([]);
              settoggle(!toggle);
              setmode("hard");
            }}
          >
            Hard
          </button>
          <button
            className="inner"
            onClick={() => {
              settoggle(!toggle);
              setmode(`${random()}`);
            }}
          >
            Randome
          </button>
          <button
            className="inner"
            onClick={() => {
              setdata([]);
            }}
          >
            Clear All
          </button>
        </div>

        <br />
        <div id="outer">
          <button
            className="inner"
            className="inner"
            onClick={() => {
              setvalidation(Validate(puzzle.rows));
            }}
          >
            Validate :
          </button>
          <p className="inner">{validation}</p>
          <button
            className="inner"
            onClick={() => {
              mode === "easy" || mode === ""
                ? Solution(puzzle.rows, setPuzzle, dataset, setSolutionMsg)
                : setSolutionMsg(`It Can not Solve ${mode} Level Yet!`);
            }}
          >
            Solve:
          </button>
          <p className="inner">{solutionMsg}</p>
        </div>
      </div>
    </div>
  );
}
