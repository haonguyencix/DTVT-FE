import React, { useState, useRef, useEffect, Fragment } from "react";
import styles from "./styles.module.scss";
import Avt from "assets/img/avt-default-2.png";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  Avatar,
  TextareaAutosize,
  IconButton,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import { Image, Close } from "@material-ui/icons";
import { createPost, actCheckSubmit } from "core/store/posts/postAction";
import ImageItem from "../ImageItem";

const CreatePost = () => {
  const dispatch = useDispatch();

  const isSubmit = useSelector(state => state.postData.isSubmit);

  const imageUpload = useRef(null);
  const closeBtn = useRef(null);
  const textarea = useRef(null);

  const [values, setValues] = useState({ textarea: "", radio: null });
  const [isActive, setIsActive] = useState(false);
  const [imgUploadArr, setImgUploadArr] = useState([]);

  const radioArr = [
    { value: "news", label: "Bảng tin" },
    { value: "classrooms", label: "Các lớp đang giảng dạy" },
    { value: "class", label: "Các lớp đang chủ nhiệm" },
    { value: "grade", label: "Các khóa sinh viên" },
  ];

  const renderRadios = radioArr.map((item, index) => (
    <FormControlLabel
      key={index}
      value={item.value}
      control={<Radio className={styles.Radio} />}
      label={item.label}
    />
  ));

  const uploadImagesChangedHandler = event => {
    let cloneImgArr = [...imgUploadArr];

    for (const file of event.target.files) {
      const id = Math.random()
        .toString(36)
        .substr(2, 9);
      cloneImgArr.push({ id, file, url: URL.createObjectURL(file) });
    }

    setImgUploadArr(cloneImgArr);
  };

  const deleteImageItem = id => {
    setImgUploadArr(imgUploadArr.filter(item => item.id !== id));
  };

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSumit = () => {
    let formData = new FormData();

    for (const item of imgUploadArr) {
      formData.append("image", item.file);
    }

    formData.append("postContent", values.textarea);
    // formData.append("postCategoryId", values.radio);

    if(values.textarea.length > 0) {
      dispatch(createPost(formData, closeBtn.current, textarea.current));
    }
  };

  useEffect(() => {
    if(isSubmit) {
      setImgUploadArr([])
      dispatch(actCheckSubmit(false));
    }
  }, [isSubmit, dispatch])

  return (
    <Fragment>
      <div
        onClick={() => setIsActive(false)}
        className={clsx(styles.ShowOverlay, {
          [styles.HideOverlay]: !isActive
        })}
      ></div>
      <div
        className={clsx(styles.Container, {
          [styles.Bubble]: isActive
        })}
      >
        <div className={styles.Header}>
          <h2 className={styles.Title}>Tạo bài viết</h2>
          {isActive && (
            <IconButton
              ref={closeBtn}
              className={styles.CloseBtn}
              onClick={() => setIsActive(false)}
            >
              <Close />
            </IconButton>
          )}
        </div>
        <div
          className={styles.Body}
          onClick={() => {
            setIsActive(true);
            textarea.current.focus();
          }}
        >
          <div className={styles.Content}>
            <div className={styles.ContentInput}>
              <Avatar src={Avt} alt="Avatar mặc định" />
              <TextareaAutosize
                ref={textarea}
                name="textarea"
                className={styles.Textarea}
                placeholder={isActive ? "Bạn viết gì đó đi..." : "Nội dung bạn muốn chia sẻ là gì?"}
                onChange={handleChange}
              ></TextareaAutosize>
            </div>
            {isActive && (
              <div className={styles.ImageItems}>
                {imgUploadArr.map((item, index) => (
                  <ImageItem
                    key={index + item.id}
                    id={item.id}
                    url={item.url}
                    position={index + 1}
                    deleteImageItem={deleteImageItem}
                  />
                ))}
              </div>
            )}
          </div>
          <div className={styles.AttachFiles}>
            <Button
              startIcon={<Image />}
              className={styles.FileUpload}
              onClick={() => imageUpload.current.click()}
            >
              <input
                multiple
                ref={imageUpload}
                name="imgArr"
                type="file"
                accept="image/*,video/*"
                onChange={uploadImagesChangedHandler}
              />
              Ảnh/Video
            </Button>
          </div>
        </div>
        {isActive && (
          <div className={styles.Footer}>
            <RadioGroup
              className={styles.RadioGroup}
              name="radio"
              onChange={handleChange}
            >
              {renderRadios}
            </RadioGroup>
            <Button
              fullWidth
              onClick={handleSumit}
              className={styles.Submit}
              disabled={values.textarea.length === 0}
            >
              Đăng
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CreatePost;
