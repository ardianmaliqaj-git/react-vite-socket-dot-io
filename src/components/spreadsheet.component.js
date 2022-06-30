import "../stylesheets/spreadsheet.stylesheet.css";

import React, { useEffect, useState } from "react";
import { useClientRect, useKeyCode } from "../hooks/client.rect.usehook";

let SpreadsheetComponent = function () {

  let [rows] = useState(17);
  let [columns] = useState(13);

  let [focusRow, focusOnRow] = useState();
  let [focusColumn, focusOnColumn] = useState();
  let [hoverRow, hoverOnRow] = useState(0);
  let [hoverColumn, hoverOnColumn] = useState(0);

  let [{ top, left, right, bottom }, setRef] = useClientRect();

  let [code, eachEvent] = useKeyCode();

  useEffect(() => {
    switch (code) {
      case "ArrowDown":
        focusOnRow(Math.abs(focusRow + 1 + rows) % rows);
        break;
      case "ArrowUp":
        focusOnRow(Math.abs(focusRow - 1 + rows) % rows);
        break;
      case "ArrowRight":
        focusOnColumn(Math.abs(focusColumn + 1 + columns) % columns);
        break;
      case "ArrowLeft":
        focusOnColumn(Math.abs(focusColumn - 1 + columns) % columns);
        break;
    }
  }, [eachEvent]);

  let getMousePosition = function ({ clientX, clientY }) {
    let x = Math.abs((clientY - top) / (bottom - top));
    let y = Math.abs((clientX - left) / (right - left));
    return [x, y];
  };

  let setFocusPosition = function (event) {
    let [x, y] = getMousePosition(event);
    focusOnRow(Math.floor(x * rows));
    focusOnColumn(Math.floor(y * columns));
  };

  let setHoverPosition = function (event) {
    let [x, y] = getMousePosition(event);
    hoverOnRow(Math.floor(x * rows));
    hoverOnColumn(Math.floor(y * columns));
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
