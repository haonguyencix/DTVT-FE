import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import WordScoreSelect from "../WordScoreSelect";

const HaveSelect = ({ fourTable, initial, credits, subjectId }) => {
  const toggleC = useSelector((state) => state.scoreData.toggleC);
  const isReset = useSelector((state) => state.scoreData.isReset);
  // console.log("HaveSelect -> isReset", isReset)

  const renderSelectComponent = (
    <WordScoreSelect
      fourTable={fourTable}
      credits={credits}
      subjectId={subjectId}
      initial={initial}
      isReset={isReset}
    />
  );

  return (
    <Fragment>
      {initial < 2 ? renderSelectComponent : (toggleC ? renderSelectComponent : fourTable[initial])}
    </Fragment>
  );
};

export default HaveSelect;
