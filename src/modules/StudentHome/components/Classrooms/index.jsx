import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "shared/constants";
import { FormControl, NativeSelect, InputBase } from "@material-ui/core";
import ClassroomItem from "../ClassroomItem";
import * as Cookies from "js-cookie";
import { sendAccessToken } from "core/services/utils";
import { getClassrooms } from "core/store/classrooms/classroomAction";

const CustomSelect = withStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  input: {
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #c1c1c1",
    padding: "10px 26px 10px 12px",
    "&:focus": {
      backgroundColor: theme.palette.background.paper,
      borderColor: "#000",
      borderRadius: 8,
    },
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
}))(InputBase);

const Classrooms = () => {
  const dispatch = useDispatch();
  const classrooms = useSelector((state) => state.classroomData.classroomList);
  const isFetchStudentList = useSelector(
    (state) => state.classroomData.isFetchStudentList
  );
  const credential = useSelector((state) => state.accountData.credential);
  const now = new Date();

  const initialSemester = () => {
    const curMonth = now.getMonth();
    if (1 < curMonth < 6) return "II";
    if (6 < curMonth < 9) return "hè";
    if (9 < curMonth < 12) return "I";
  };

  const curSchoolYear = () => {
    const curMonth = now.getMonth();
    const curYear = now.getFullYear();
    if (1 < curMonth < 8) return `${curYear - 1}-${curYear}`;
    return `${curYear}-${curYear + 1}`;
  };

  const setupSchoolYear = () => {
    let mapping = [];
    const curYear = now.getFullYear();
    const curGrade = credential ? credential.classId : "";
    const yearIn = ("20" + curGrade.slice(4, 6)) * 1;
    const mod = curGrade ? curYear - yearIn : 0;
    Array.from({ length: mod }, (v, i) =>
      mapping.push(`${yearIn + i}-${yearIn + i + 1}`)
    );
    return mapping;
  };

  const [value, setValue] = useState({
    schoolYear: curSchoolYear(),
    semester: initialSemester(),
  });

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const selects = [
    { name: "schoolYear", content: isFetchStudentList ? "NK" : "Niên khóa", mapping: setupSchoolYear() },
    { name: "semester", content: "Học kỳ", mapping: ["I", "II", "hè"] },
  ];

  const renderSelects = selects.map((item) => (
    <FormControl
      key={item.name}
      className={clsx(styles.FormControl, {
        [styles.Shrink]: isFetchStudentList,
      })}
    >
      <NativeSelect
        input={<CustomSelect />}
        value={value[item.name]}
        onChange={handleChange}
        name={item.name}
      >
        {item.mapping.map((i) => (
          <option key={i} value={i}>
            {item.content} {i}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  ));

  useEffect(() => {
    const token = Cookies.get(TOKEN["STUDENT"]);

    if (token) {
      sendAccessToken(token);
      dispatch(getClassrooms(value));
    }
  }, [dispatch, value]);

  const renderClassrooms = classrooms.map((item) => (
    <ClassroomItem key={item.id} item={item} />
  ));
  return (
    <div className={styles.Container}>
      <div className={styles.Selects}>{renderSelects}</div>
      <div className={styles.Classrooms}>{renderClassrooms}</div>
    </div>
  );
};

export default Classrooms;
