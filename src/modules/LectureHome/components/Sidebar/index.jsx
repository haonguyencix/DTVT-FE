import React, { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Classrooms from "shared/components/Classrooms";
import Control from "shared/components/Control";
import SubjectItem from "../SubjectItem";

const Sidebar = () => {
  const now = new Date();
  const change = useSelector((state) => state.classroomData.isFetchClassroom);
  const isBubble = useSelector((state) => state.postData.isBubble);

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
      content: change ? "NK" : "Niên khóa",
      options: mappingSchoolYear(),
      styles: styles.SchoolYear,
    },
    {
      name: "semester",
      content: change ? "HK" : "Học kỳ",
      options: ["I", "II", "hè"],
      styles: styles.Semester,
    },
  ];

  return (
    <div className={clsx(styles.Container, {
      [styles.SidebarFixed]: change,
      [styles.Bubble]: isBubble
    })}>
      <Button
        variant="contained"
        className={styles.CreateClassBtn}
        startIcon={<Add />}
        disabled={isBubble}
        classes={{ disabled: styles.BtnDisabled }}
        fullWidth
      >
        {!isBubble ? "Tạo lớp mới" : "Chọn nhóm bên dưới nhé!"}
      </Button>
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
    </div>
  );
};

export default Sidebar;
