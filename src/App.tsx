import React, { useState } from "react";
import "./App.css";
import Tree from "./Tree";
function App() {
  const [height, setHeight] = useState(5);
  return (
    <div className="App">
      <header className="App-header">
        <label>
          Tree height:
          <input
            type="number"
            name="Tree height"
            onChange={(event) => setHeight(parseInt(event.target.value))}
            min="1"
          />
        </label>
      </header>
      <body>
        <Tree height={height} />
      </body>
    </div>
  );
}

export default App;
