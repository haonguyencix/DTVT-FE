import React, { useState, useRef, Fragment } from "react";
import styles from "./styles.module.scss";
import Avt from "assets/img/avt-default-2.png";
import { useDispatch } from "react-redux";
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
import { createPost } from "redux/posts/postAction";
import ImageItem from "./ImageItem";

const CreatePost = () => {
  const dispatch = useDispatch();

  const imageUpload = useRef(null);
  const textarea = useRef(null);

  const [values, setValues] = useState({ textarea: null, radio: null });
  const [showCreatePostArea, setShowCreatePostArea] = useState(false);
  const [imgUploadArr, setImgUploadArr] = useState([]);

  const radioArr = [
    { value: "news", label: "Bảng tin" },
    { value: "classrooms", label: "Chọn theo nhóm lớp" }
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

    // acountId sẽ được gửi lên từ token qua headers Author
    formData.append("postContent", values.textarea);
    // formData.append("postCategoryId", values.radio);

    dispatch(createPost(formData));
  };

  return (
    <Fragment>
      <div
        onClick={() => setShowCreatePostArea(false)}
        className={clsx(styles.ShowOverlay, {
          [styles.HideOverlay]: !showCreatePostArea
        })}
      ></div>
      <div
        className={clsx(styles.Container, {
          [styles.Bubble]: showCreatePostArea
        })}
      >
        <div className={styles.Header}>
          <h2 className={styles.Title}>Tạo bài viết</h2>
          {showCreatePostArea && (
            <IconButton
              className={styles.CloseBtn}
              onClick={() => setShowCreatePostArea(false)}
            >
              <Close />
            </IconButton>
          )}
        </div>
        <div
          className={styles.Body}
          onClick={() => {
            setShowCreatePostArea(true);
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
                placeholder="Nội dung bạn muốn chia sẻ là gì?"
                onChange={handleChange}
              ></TextareaAutosize>
            </div>
            {showCreatePostArea && (
              <div className={styles.ImageItems}>
                {imgUploadArr.map((item, index) => (
                  <ImageItem
                    key={index + item.id}
                    id={item.id}
                    url={item.url}
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
        {showCreatePostArea && (
          <div className={styles.Footer}>
            <RadioGroup
              className={styles.RadioGroup}
              name="radio"
              onChange={handleChange}
            >
              {renderRadios}
            </RadioGroup>
            <Button className={styles.Submit} fullWidth onClick={handleSumit}>
              Đăng
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CreatePost;
