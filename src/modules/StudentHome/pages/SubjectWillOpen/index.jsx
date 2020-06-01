import React from "react";
import styles from "./styles.module.scss";
import WillOpenItem from "modules/StudentHome/components/WillOpenItem";
import Classrooms from "shared/hocs/Classrooms";
import WillOpenFilter from "modules/StudentHome/components/WillOpenFilter";

const SubjectWillOpen = () => {
  const now = new Date();

  const curSchoolYear = () => {
    const curMonth = now.getMonth();
    const curYear = now.getFullYear();
    if (1 < curMonth < 8) return `${curYear - 1}-${curYear}`;
    return `${curYear}-${curYear + 1}`;
  };

  const initialSemester = () => {
    const curMonth = now.getMonth();
    if (1 < curMonth < 6) return 2;
    if (6 < curMonth < 9) return 3;
    if (9 < curMonth < 12) return 1;
  };

  const filter = {
    category: "will-open",
    schoolYear: curSchoolYear(),
    semester: initialSemester(),
  };

  return (
    <div className={styles.Container}>
      <WillOpenFilter />
      <div className={styles.WorkSpace}>
        <Classrooms
          value={filter}
          role="STUDENT"
          render={(item) => <WillOpenItem item={item} />}
        />
      </div>
    </div>
  );
};

export default SubjectWillOpen;
