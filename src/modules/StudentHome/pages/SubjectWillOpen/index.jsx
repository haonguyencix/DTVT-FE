import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import WillOpenFilter from "modules/StudentHome/components/WillOpenFilter";
import subjectService from "core/store/subjects/subjectService";
import TableCheckbox from "shared/components/TableCheckbox";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";

const head = {
  calories: "Mã môn học",
  fat: "Tên môn học",
  carbs: "Học kỳ",
  protein: "Niên khoá",
};

const SubjectWillOpen = () => {
  const [commingSubjects, setCommingSubjects] = useState([]);
  const credential  = useSelector((state) => state.accountData.credential);
  const accountId = credential.accountId;
  const handleSubmit = (selectedIds) => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const createdAt = date + ' ' + time;

    selectedIds.forEach(subjectId => {
      subjectService
        .postCommingSubject({ studentId: accountId, subjectId, createdAt })
        .then((res) => {
          window.location.reload();
        }).catch((err) => {
          alert(err.response.data.message);
        });
    });    
  };

  useEffect(() => {
    subjectService
      .fetchCommingSubject(accountId)
      .then((res) => {
        const { subjects } = res.data;  
        const newSubjects = subjects.map(subject => {
          return Object.keys(subject).reduce((object, key) => {
            if (key !== 'openID') {
              object[key] = subject[key]
            }
            return object
          }, {});
        });
        setCommingSubjects(newSubjects);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.Container}>
      <WillOpenFilter />
      <div className={styles.WorkSpace}>
        <TableCheckbox
          rows={commingSubjects}
          head={head}
          haveSort={true}
          primaryKey="id"
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
