import React, { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { stringShortcut } from "core/services/utils";
import { Tooltip, Checkbox, FormControlLabel } from "@material-ui/core";
import ClassroomItem from "../ClassroomItem";
import { actSetClassroomSelecteds } from "core/store/classrooms/classroomAction";

const SubjectItem = (props) => {
  const { subjectId, subjectName, classrooms } = props.item;

  const dispatch = useDispatch();

  const change = useSelector((state) => state.classroomData.isFetchClassroom);
  const isBubble = useSelector((state) => state.postData.isBubble);

  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = classrooms.map((classroom) => classroom.id);
      setSelected(newSelecteds);
      dispatch(actSetClassroomSelecteds(subjectId, newSelecteds));
      return;
    }
    setSelected([]);
    dispatch(actSetClassroomSelecteds(subjectId, []));
  };

  const handleClick = (classroomId) => {
    const selectedIndex = selected.indexOf(classroomId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, classroomId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    dispatch(actSetClassroomSelecteds(subjectId, newSelected));
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const renderClassroom = classrooms.map((item, index) => {
    const { theory, practice, ...classroom } = item;

    const leadZero = (value) => {
      if (value < 10) return "0" + value;
      return value;
    };

    const temp = practice ? " - Thực hành" + leadZero(practice) : "";
    const groupName = "Nhóm " + leadZero(theory) + temp;

    if (!isBubble) {
      return (
        <ClassroomItem
          key={index}
          classroom={classroom}
          groupName={groupName}
        />
      );
    } else {
      return (
        <FormControlLabel
          key={index}
          label={groupName}
          onClick={() => handleClick(classroom.id)}
          classes={{ root: styles.ItemRoot, label: styles.ItemLabel }}
          control={
            <Checkbox
              classes={{ root: styles.CheckBox, checked: styles.Checked }}
              checked={isSelected(classroom.id)}
            />
          }
        />
      );
    }
  });

  return (
    <div
      className={clsx(styles.Container, {
        [styles.Bubble]: isBubble,
      })}
    >
      <Tooltip
        title={subjectName.length > 36 ? subjectName : ""}
        placement="top"
        arrow
      >
        {!isBubble ? (
          <div className={styles.SubjectName} onClick={() => setOpen(!open)}>
            {stringShortcut(subjectName, !change ? 36 : 18)}
          </div>
        ) : (
          <FormControlLabel
            label={stringShortcut(subjectName, !change ? 36 : 18)}
            classes={{ root: styles.Root, label: styles.Label }}
            control={
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < classrooms.length}
                onChange={handleSelectAllClick}
                classes={{ root: styles.CheckBox, checked: styles.Checked }}
                checked={
                  classrooms.length > 0 && selected.length === classrooms.length
                }
              />
            }
          />
        )}
      </Tooltip>
      {open && renderClassroom}
    </div>
  );
};

export default SubjectItem;
