import React from "react";
import styles from "./styles.module.scss";
import ClassroomItem from "../ClassroomItem";
import { useSelector } from "react-redux";

const Classrooms = () => {
  const classrooms = useSelector(state => state.classroomData.classroomList)

  const renderClassrooms = classrooms.map((item) => (
    <ClassroomItem key={item.id} item={item} />
  ));
  return <div className={styles.Container}>{renderClassrooms}</div>;
};

export default Classrooms;
