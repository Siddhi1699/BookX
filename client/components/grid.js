import React from "react";
import { chunk } from "lodash";
import { Box } from "./box";

export const Grid = ({ books }) => {
  const chunkedLaunches = chunk(books, 3);
  return (
    <div>
      {chunkedLaunches.map((row, index) => {
        return (
          <div className="tile is-parent " key={index}>
            {row.map((col, index) => {
              return   <Box book={col} key={index}/> 
            })}
          </div>
        );
      })}
    </div>
  );
};