import React, { useState } from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PATH } from "shared/constants";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { actSetClassroomSelecteds } from "core/store/classrooms/classroomAction";

const ConsultantItem = (props) => {
  const { item } = props;

  const isBubble = useSelector((state) => state.postData.isBubble);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);

  const handleClick = (classId) => {
    const selectedIndex = selected.indexOf(classId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, classId);
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
    dispatch(actSetClassroomSelecteds(classId, newSelected));
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={styles.Container}>
      {isBubble ? (
        <FormControlLabel
          label={item.classId}
          onClick={() => handleClick(item.classId)}
          classes={{ root: styles.ItemRoot, label: styles.ItemLabel }}
          control={
            <Checkbox
              classes={{ root: styles.CheckBox, checked: styles.Checked }}
              checked={isSelected(item.classId)}
            />
          }
        />
      ) : (
        <NavLink
          to={PATH["LECTURE_CLASSROOM_NEWSFEED"](item.classId, 2)}
          className={styles.Links}
          activeClassName={styles.LinkActive}
        >
          {item.classId}
        </NavLink>
      )}
    </div>
  );
};

export default ConsultantItem;
