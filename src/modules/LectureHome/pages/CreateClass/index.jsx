import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Formik, Form } from "formik";
import { TextField, Button, Grid } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import subjectService from "core/store/subjects/subjectService";
import { createClassroom } from "core/store/classrooms/classroomAction";
import { useSelector } from "react-redux";

const CreateClass = () => {

  const [commingSubjects, setCommingSubjects] = useState([]);  
  useEffect(() => {
    subjectService
      .fetchCommingSubject()
      .then((res) => {
        console.log(res.data.subjects)
        setCommingSubjects(res.data.subjects);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Formik
      initialValues={{
        lectureId: '',
        subjectId: "",
        theory: 1,
        practice: 0,
        endPercent: 50,
        examForms: "",
        schoolYear: "",
        semester: 1,
        day: "",
        room: "",
        start: 1,
        count: 2,
        students: "",
      }}
      onSubmit={(values, { resetForm }) => {
        createClassroom(values, resetForm);
      }}
    >
      {({ handleChange, values, setFieldValue }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                onChange={(e, v) => {
                  if (v) {
                    setFieldValue("subjectId", v.id);
                    setFieldValue("schoolYear", v.yearSchool);
                    setFieldValue("semester", v.semester);
                  }
                }}
                fullWidth
                options={commingSubjects}
                getOptionLabel={(option) => option.id + " - " + option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    type="text"
                    margin="normal"
                    variant="outlined"
                    label="Tên lớp"
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                value={values.theory}
                name="theory"
                type="number"
                inputProps={{ min: 0 }}
                margin="normal"
                variant="outlined"
                label="Lý thuyết"
                autoComplete="theory"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                value={values.practice}
                name="practice"
                type="number"
                inputProps={{ min: 0 }}
                margin="normal"
                variant="outlined"
                label="Thực hành"
                autoComplete="practice"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={values.examForms}
                name="examForms"
                type="text"
                margin="normal"
                variant="outlined"
                label="Hình thức thi cuối kỳ"
                placeholder="Ví dụ: Trắc nghiệm 40 câu,..."
                autoComplete="examForms"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                value={values.endPercent}
                name="endPercent"
                type="number"
                inputProps={{ min: 0, max: 100, step: 10 }}
                margin="normal"
                variant="outlined"
                label="Điểm cuối kỳ (%)"
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                value={values.day}
                name="day"
                type="number"
                inputProps={{ min: 0, max: 7, step: 1 }}
                margin="normal"
                variant="outlined"
                label="Thứ"
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                value={values.room}
                name="room"
                type="text"
                margin="normal"
                variant="outlined"
                label="Phòng"
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                value={values.start}
                name="start"
                type="number"
                inputProps={{ min: 1, max: 13, step: 1 }}
                margin="normal"
                variant="outlined"
                label="Bắt đầu tiết"
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                value={values.count}
                name="count"
                type="number"
                inputProps={{ min: 1, max: 13, step: 1 }}
                margin="normal"
                variant="outlined"
                label="Số tiết"
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={10}
                value={values.students}
                name="students"
                type="text"
                margin="normal"
                variant="outlined"
                label="Danh sách mã sinh viên"
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            className={styles.BtnSubmit}
            type="submit"
            variant="contained"
            endIcon={<ChevronRight />}
          >
            Tiến hành tạo lớp
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateClass;
