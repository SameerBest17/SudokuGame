import "./App.css";
import Sudoku from "./Components/index";
import { React, useState, useEffect } from "react";
import { getPuzzle } from "./services/puzzle";

function App() {
  const [data, setdata] = useState([]);
  const [toggle,settoggle] = useState(0);
  const [mode, setmode] = useState("");
  
  useEffect(() => {
    
    let mounted = true;
    getPuzzle(mode).then((items) => {
      if (mounted) {
        setdata(items.puzzle);
      }
    });
    return () => (mounted = false);
  }, [toggle,mode]);

  return (
    <div className="App">
      <Sudoku  dataset={data} mode={mode} setdata={setdata} setmode={setmode} toggle={toggle} settoggle={settoggle} />
    </div>
  );
}

export default App;
