import React from "react";
import classes from "./style.module.scss";
import TreeCard from "../TreeCard";

const TreeList = (props) => {
  const renderTreeCard = props.subjects.map((sub) => (
    <TreeCard key={sub.id} subject={sub} />
  ));
  return <div className={classes.TreeList}>{renderTreeCard}</div>;
};
export default TreeList;
