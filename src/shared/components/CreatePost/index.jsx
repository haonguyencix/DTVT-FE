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
  FormControlLabel,
} from "@material-ui/core";
import { Image, Close } from "@material-ui/icons";
import {
  createPost,
  actCheckSubmit,
  actSetBubble,
  actSelectPostType,
} from "core/store/posts/postAction";
import ImageItem from "./ImageItem";

const CreatePost = (props) => {
  const { junctionId, type } = props;
  const dispatch = useDispatch();

  const isSubmit = useSelector((state) => state.postData.isSubmit);
  const typeSelected = useSelector((state) => state.postData.typeSelected);
  const classroomSelecteds = useSelector((state) => state.classroomData.classroomSelecteds);

  const imageUpload = useRef(null);
  const closeBtn = useRef(null);
  const textarea = useRef(null);

  const [values, setValues] = useState({ textarea: "", radio: "newsfeed" });
  const [isActive, setIsActive] = useState(false);
  const [imgUploadArr, setImgUploadArr] = useState([]);

  const radioArr = [
    { value: "newsfeed", label: "Bảng tin" },
    { value: "groups", label: "Đăng tin theo nhóm" },
  ];

  const renderRadios = radioArr.map((item, index) => (
    <FormControlLabel
      key={index}
      label={item.label}
      value={item.value}
      control={
        <Radio className={styles.Radio} checked={values.radio === item.value} />
      }
    />
  ));

  const uploadImagesChangedHandler = (event) => {
    let cloneImgArr = [...imgUploadArr];

    for (const file of event.target.files) {
      const id = Math.random().toString(36).substr(2, 9);
      cloneImgArr.push({ id, file, url: URL.createObjectURL(file) });
    }

    setImgUploadArr(cloneImgArr);
  };

  const deleteImageItem = (id) => {
    setImgUploadArr(imgUploadArr.filter((item) => item.id !== id));
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSumit = () => {
    let formData = new FormData();

    for (const item of imgUploadArr) {
      formData.append("image", item.file);
    }

    formData.append("postContent", values.textarea);

    const reducer = (acc, cur) => acc.concat(cur);
    const selecteds = Object.values(classroomSelecteds).reduce(reducer, []);

    formData.append("postType", typeSelected || type);

    if (values.radio === "groups" && typeSelected) {
      formData.append("destination", selecteds.join(","));
    }

    if (type !== 0) {
      formData.append("destination", junctionId);
    }

    if (values.textarea.length > 0) {
      dispatch(createPost(formData, closeBtn.current, textarea.current, { type, junctionId }));
    }
  };

  const handleClose = () => {
    setIsActive(false);
    dispatch(actSetBubble(false));
    dispatch(actSelectPostType(0));
    setValues({ ...values, radio: "newsfeed" });
  };

  useEffect(() => {
    if (isSubmit) {
      setImgUploadArr([]);
      dispatch(actCheckSubmit(false));
    }
  }, [isSubmit, dispatch]);

  useEffect(() => {
    if (values.radio === "groups") {
      dispatch(actSetBubble(true));
      dispatch(actSelectPostType(1)); // initial category (classrooms)
    } else {
      dispatch(actSetBubble(false));
    }
  }, [isActive, dispatch, values.radio]);

  return (
    <Fragment>
      <div
        onClick={() => handleClose()}
        className={clsx(styles.ShowOverlay, {
          [styles.HideOverlay]: !isActive,
        })}
      ></div>
      <div
        className={clsx(styles.Container, {
          [styles.Bubble]: isActive,
        })}
      >
        <div className={styles.Header}>
          <h2 className={styles.Title}>Tạo bài viết</h2>
          {isActive && (
            <IconButton
              ref={closeBtn}
              className={styles.CloseBtn}
              onClick={() => handleClose()}
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
                onChange={handleChange}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                placeholder={
                  isActive
                    ? "Bạn viết gì đó đi..."
                    : "Nội dung bạn muốn chia sẻ là gì?"
                }
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
            {type === 0 && (
              <RadioGroup
                className={styles.RadioGroup}
                name="radio"
                onChange={handleChange}
              >
                {renderRadios}
              </RadioGroup>
            )}
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
