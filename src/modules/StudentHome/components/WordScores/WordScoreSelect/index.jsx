import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import {
  actUpdateFourInList,
  actSetReset,
} from "core/store/scores/scoreAction";
import { useDispatch } from "react-redux";

const WordScoreSelect = ({
  fourTable,
  initial,
  credits,
  subjectId,
  isReset,
}) => {
  const dispatch = useDispatch();

  const [fourScore, setFourScore] = useState(0);

  const handleChange = (event) => {
    setFourScore(event.target.value);
    dispatch(
      actUpdateFourInList(
        subjectId,
        parseInt(event.target.value) * parseInt(credits)
      )
    );
  };

  useEffect(() => {
    setFourScore(initial);
    if (isReset) {
      dispatch(actSetReset(false));
    }
  }, [dispatch, isReset, initial]);

  return (
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
  );
};

export default WordScoreSelect;
