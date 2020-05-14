import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import ClassroomService from "core/store/classrooms/classroomService";
import Classrooms from "shared/components/Classrooms";
import Control from "shared/components/Control";
import SubjectItem from "../SubjectItem";
import ConsultantItem from "../ConsultantItem";
import GradeItem from "../GradeItem";
import { actSelectPostType } from "core/store/posts/postAction";

const Sidebar = () => {
  const now = new Date();
  const dispatch = useDispatch();
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
    if (1 < curMonth < 6) return 2;
    if (6 < curMonth < 9) return 3;
    if (9 < curMonth < 12) return 1;
  };

  const [cateOpts, setCateOpts] = useState({});
  const [cateIds, setCateIds] = useState({});
  const [value, setValue] = useState({
    category: "classrooms",
    schoolYear: curSchoolYear(),
    semester: initialSemester(),
  });

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    if (isBubble && event.target.name === "category") {
      dispatch(actSelectPostType(cateIds[event.target.value]));
    }
  };

  const mappingSchoolYear = () => {
    let mapping = {};
    const curYear = now.getFullYear();
    const howLong = 4;
    Array.from({ length: howLong }, (v, i) => {
      const value = `${curYear - i - 1}-${curYear - i}`;
      return (mapping[value] = value);
    });
    return mapping;
  };

  useEffect(() => {
    ClassroomService.getClassroomCategory()
      .then((res) => {
        let opts = {};
        let ids = {};
        for (let v of res.data) {
          opts[v.acronym] = v.typeName;
          ids[v.acronym] = v.typeId;
        }
        setCateIds(ids);
        setCateOpts(opts);
      })
      .catch((err) => new Error(err));
  }, []);

  const selectList = [
    {
      name: "category",
      options: cateOpts,
      styles: styles.Category,
    },
    {
      name: "schoolYear",
      common: change ? "NK" : "Niên khóa",
      options: mappingSchoolYear(),
      styles: styles.SchoolYear,
      disabled: value.category === "consultants"
    },
    {
      name: "semester",
      common: change ? "HK" : "Học kỳ",
      options: { 1: "I", 2: "II", 3: "hè" },
      styles: styles.Semester,
      disabled: value.category === "consultants"
    },
  ];

  const withClassrooms = (Component) => (
    <Classrooms
      value={value}
      role="LECTURE"
      render={(item) => <Component item={item} />}
    />
  );

  const filterByCategory = {
    classrooms: withClassrooms(SubjectItem),
    consultants: withClassrooms(ConsultantItem),
    grades: withClassrooms(GradeItem),
  };

  return (
    <div
      className={clsx(styles.Container, {
        [styles.SidebarFixed]: change,
        [styles.Bubble]: isBubble,
      })}
    >
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
      {filterByCategory[value.category]}
    </div>
  );
};

export default Sidebar;
