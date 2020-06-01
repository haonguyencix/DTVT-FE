import React, { useState, useEffect, Fragment } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import { actUpdateFour } from "core/store/scores/scoreAction";
import { useDispatch } from "react-redux";

const fourTable = { 0: "F", 1: "D", 2: "C", 3: "B", 4: "A" };

const WordScores = ({ expand, initial, credits, subjectId, condition }) => {
  const dispatch = useDispatch();

  const [fourScore, setFourScore] = useState(0);

  const handleChange = (event) => {
    setFourScore(event.target.value);
    dispatch(actUpdateFour(subjectId, parseInt(event.target.value) * parseInt(credits)));
  };

  useEffect(() => setFourScore(initial), [initial]);

  return (
    <Fragment>
      {condition ? (!expand && initial < 2 ? (
        <FormControl>
          <NativeSelect
            value={fourScore}
            onChange={handleChange}
            name="word-scores"
          >
            {Object.keys(fourTable).map((v, i) => (
              <option key={i} value={v}>
                {fourTable[v]}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      ) : (
        fourTable[initial]
      )) : "Chưa xét"}
    </Fragment>
  );
};

export default WordScores;
