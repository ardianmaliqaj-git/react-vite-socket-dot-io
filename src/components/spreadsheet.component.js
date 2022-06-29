import { useState } from "react";

import "../stylesheets/spreadsheet.stylesheet.css";

let SpreadsheetComponent = function () {
  let [rows] = useState(17);
  let [columns] = useState(13);
  let [activeRow] = useState(0);
  let [activeColumn] = useState(0);

  return (
    <div className="spreadsheet">
      <div className="container">
        {[...Array(rows).keys()].map((row) => {
          return (
            <div key={row} className="rows">
              {[...Array(columns).keys()].map((column) => {
                return (
                  <div
                    key={column}
                    className={`columns ${
                      row == activeRow && column == activeColumn ? "focus" : ""
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