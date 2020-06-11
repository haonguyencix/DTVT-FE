import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import WillOpenItem from "modules/StudentHome/components/WillOpenItem";
import WillOpenFilter from "modules/StudentHome/components/WillOpenFilter";
import subjectService from "core/store/subjects/subjectService";
import TableCheckbox from "shared/components/TableCheckbox";
import { Button } from "@material-ui/core";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
];

const head = {
  name: "Dessert (100g serving)",
  calories: "Calories",
  fat: "Fat (g)",
  carbs: "Carbs (g)",
  protein: "Protein (g)",
};

const SubjectWillOpen = () => {
  const [commingSubjects, setCommingSubjects] = useState([]);

  const handleSubmit = (selected) => {
    console.log(selected);
  };

  useEffect(() => {
    subjectService
      .fetchCommingSubject()
      .then((res) => {
        setCommingSubjects(res.data.subjects);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.Container}>
      <WillOpenFilter />
      <div className={styles.WorkSpace}>
        <TableCheckbox
          rows={rows}
          head={head}
          haveSort={true}
          primaryKey="name"
          renderBtnSubmit={(selected) => (
            <Button
              fullWidth
              className={styles.BtnSubmit}
              onClick={() => handleSubmit(selected)}
            >
              Gửi yêu cầu
            </Button>
          )}
        />
      </div>
    </div>
  );
};

export default SubjectWillOpen;
