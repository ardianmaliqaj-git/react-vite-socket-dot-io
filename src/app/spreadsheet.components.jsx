import "./spreadsheet.stylesheets.css";

import { useEffect, useState } from "react";
import { useClientRect, useKeyCode } from "./spreadsheet.hooks";

let SpreadsheetComponent = function () {
  let [rows] = useState(17);
  let [columns] = useState(13);

  let [focusRow, focusOnRow] = useState(0);
  let [focusColumn, focusOnColumn] = useState(0);
  let [hoverRow, hoverOnRow] = useState(0);
  let [hoverColumn, hoverOnColumn] = useState(0);

  let [ref, setRef] = useClientRect();

  let [code, time] = useKeyCode("keydown", ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"]);

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
  }, [time]);

  let getMousePosition = function (event) {
    let { top, left, right, bottom } = ref;
    let x = Math.abs((event.clientY - top) / (bottom - top));
    let y = Math.abs((event.clientX - left) / (right - left));
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

  useEffect(
    function () {
      hoverOnRow(focusRow);
      hoverOnColumn(focusColumn);
    },
    [focusRow, focusColumn]
  );

  return (
    <div className="spreadsheet">
      <div className="nodes">
        <div className="node">
          {hoverRow + 1}:{hoverColumn + 1}
        </div>
      </div>
      <div className="container" ref={setRef} onMouseDown={setFocusPosition}>
        {[...Array(rows).keys()].map(function (row) {
          return (
            <div key={row} className="rows">
              {[...Array(columns).keys()].map(function (column) {
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

export default SpreadsheetComponent;
