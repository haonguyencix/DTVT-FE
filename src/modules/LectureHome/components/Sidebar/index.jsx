import React, { useState, Fragment } from "react";
import styles from "./styles.module.scss";
import Classrooms from "shared/components/Classrooms";
import Control from "shared/components/Control";
import SubjectItem from "../SubjectItem";

const Sidebar = () => {
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
    category: "Các lớp đang giảng dạy",
    schoolYear: curSchoolYear(),
    semester: initialSemester(),
  });

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const mappingSchoolYear = () => {
    let mapping = [];
    const curYear = now.getFullYear();
    const howLong = 4;
    Array.from({ length: howLong }, (v, i) =>
      mapping.unshift(`${curYear - i - 1}-${curYear - i}`)
    );
    return mapping;
  };

  const selectList = [
    {
      name: "category",
      content: "",
      options: ["Các lớp giảng dạy", "Các lớp chủ nhiệm", "Các khóa sinh viên"],
      styles: styles.Category,
    },
    {
      name: "schoolYear",
      content: "Niên khóa",
      options: mappingSchoolYear(),
      styles: styles.SchoolYear,
    },
    {
      name: "semester",
      content: "Học kỳ",
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
        role="LECTURE"
        render={(item) => <SubjectItem item={item} />}
      />
    </Fragment>
  );
};

export default Sidebar;
