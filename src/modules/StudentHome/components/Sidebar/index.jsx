import React, { useState, Fragment } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import Classrooms from "shared/components/Classrooms";
import ClassroomItem from "../ClassroomItem";
import Control from "shared/components/Control";

const Sidebar = () => {
  const credential = useSelector((state) => state.accountData.credential);
  const change = useSelector((state) => state.classroomData.isFetchClassroom);
  const now = new Date();

  const curSchoolYear = () => {
    const curMonth = now.getMonth();
    const curYear = now.getFullYear();
    if (1 < curMonth < 8) return `${curYear - 1}-${curYear}`;
    return `${curYear}-${curYear + 1}`;
  };

  const initialSemester = () => {
    const curMonth = now.getMonth();
    if (1 < curMonth < 6) return "II";
    if (6 < curMonth < 9) return "hè";
    if (9 < curMonth < 12) return "I";
  };

  const [value, setValue] = useState({
    schoolYear: curSchoolYear(),
    semester: initialSemester(),
  });

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const mappingSchoolYear = () => {
    const curYear = now.getFullYear();
    const curGrade = credential ? credential.classId.slice(4, 6) : "";
    const yearIn = ("20" + curGrade) * 1;
    const mod = curGrade ? curYear - yearIn : 0;
    return Array.from({ length: mod }, (v, i) => `${yearIn + i}-${yearIn + i + 1}`);
  };

  const selectList = [
    {
      name: "schoolYear",
      common: change ? "NK" : "Niên khóa",
      options: mappingSchoolYear(),
      styles: styles.SchoolYear,
    },
    {
      name: "semester",
      common: change ? "HK" : "Học kỳ",
      options: ["I", "II", "hè"],
      styles: styles.Semester,
    },
  ];

  return (
    <Fragment>
      <Control
        value={value}
        selectList={selectList}
        className={styles.Control}
        handleChange={handleChange}
      />
      <Classrooms
        value={value}
        role="STUDENT"
        className={styles.Classrooms}
        render={(item) => <ClassroomItem item={item} />}
      />
    </Fragment>
  );
};

export default Sidebar;
