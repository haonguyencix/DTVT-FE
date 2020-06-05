import React, { Fragment } from "react";
import HaveSelect from "./HaveSelect";

const fourTable = { 0: "F", 1: "D", 2: "C", 3: "B", 4: "A" };

const WordScores = ({ expand, initial, credits, subjectId, condition }) => {
  return (
    <Fragment>
      {condition ? (
        !expand && initial < 3 ? (
          <HaveSelect
            fourTable={fourTable}
            credits={credits}
            subjectId={subjectId}
            initial={initial}
          />
        ) : (
          fourTable[initial]
        )
      ) : (
        "Chưa xét"
      )}
    </Fragment>
  );
};

export default WordScores;
