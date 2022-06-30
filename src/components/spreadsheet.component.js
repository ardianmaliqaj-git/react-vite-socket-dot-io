import React, { useState } from "react";
import useClientRect from "../hooks/client.rect.use.hook";
import "../stylesheets/spreadsheet.stylesheet.css";

let SpreadsheetComponent = function () {
  let [rows] = useState(17);
  let [columns] = useState(13);
  let [focusRow, setFocusRow] = useState();
  let [focusColumn, setFocusColumn] = useState();
  let [hoverRow, setHoverRow] = useState(0);
  let [hoverColumn, setHoverColumn] = useState(0);

  let [{ top, left, right, bottom }, setRef] = useClientRect();
  let calcMousePosition = function ({ clientX, clientY }) {
    let x = Math.abs((clientY - top) / (bottom - top));
    let y = Math.abs((clientX - left) / (right - left));
    return [x, y];
  };

  let setFocusPosition = function (event) {
    let [x, y] = calcMousePosition(event);
    setFocusRow(Math.floor(x * rows));
    setFocusColumn(Math.floor(y * columns));
  };

  let setHoverPosition = function (event) {
    let [x, y] = calcMousePosition(event);
    setHoverRow(Math.floor(x * rows));
    setHoverColumn(Math.floor(y * columns));
  };

  return (
    <div className="spreadsheet">
      <div className="nodes">
        <div className="node">
          {hoverRow + 1}:{hoverColumn + 1}
        </div>
      </div>
      <div className="container" ref={setRef} onMouseDown={setFocusPosition}>
        {[...Array(rows).keys()].map((row) => {
          return (
            <div key={row} className="rows">
              {[...Array(columns).keys()].map((column) => {
                return (
                  <div
                    key={column}
                    onMouseEnter={setHoverPosition}
                    className={`columns ${
                      row === focusRow && column === focusColumn ? "focus" : ""
                    }`}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(SpreadsheetComponent);
