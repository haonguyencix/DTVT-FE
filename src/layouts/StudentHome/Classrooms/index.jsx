import React from "react";
import styles from "./styles.module.scss";
import Classroom from "./Classroom";
import { useSelector } from "react-redux";

const Classrooms = () => {
  const classrooms = useSelector(state => state.classroomData.classroomList)

  const renderClassrooms = classrooms.map((item) => (
    <Classroom key={item.id} item={item} />
  ));
  return <div className={styles.Container}>{renderClassrooms}</div>;
};

export default Classrooms;
