import React, { useState } from "react";
import styles from "./styles.module.scss";
import { stringShortcut } from "core/services/utils";
import { Tooltip } from "@material-ui/core";
import ClassroomItem from "../ClassroomItem";
import { useSelector } from "react-redux";

const SubjectItem = (props) => {
  const { subjectName, classrooms } = props.item;

  const change = useSelector((state) => state.classroomData.isFetchStudentList);

  const [open, setOpen] = useState(true);

  return (
    <div className={styles.Container}>
      <Tooltip
        title={subjectName.length > 36 ? subjectName : ""}
        placement="top"
        arrow
      >
        <div className={styles.SubjectName} onClick={() => setOpen(!open)}>
          {stringShortcut(subjectName, !change ? 36 : 18)}
        </div>
      </Tooltip>
      {open &&
        classrooms.map((item, index) => (
          <ClassroomItem key={index} item={item} />
        ))}
    </div>
  );
};

export default SubjectItem;
