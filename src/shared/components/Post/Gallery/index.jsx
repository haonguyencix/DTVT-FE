import React, {
  useState,
  Fragment,
  useEffect,
  useRef,
  useCallback,
} from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { Button, IconButton } from "@material-ui/core";
import {
  NavigateBefore,
  NavigateNext,
  Close,
  ZoomIn,
  ZoomOut,
} from "@material-ui/icons";
import { _baseURL } from "core/services/axios";
import PostService from "core/store/posts/postService";

const Gallery = (props) => {
  const { postId, numImgs, firstImg } = props;

  const [isFetching, setIsFetching] = useState(true);
  const [curSlide, setCurSlide] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [imageList, setImageList] = useState([
    { imageId: firstImg.id, imageUrl: firstImg.imageUrl },
  ]);

  const container = useRef(null);

  const getImgs = () => {
    setIsShow(true);

    if (isFetching) {
      PostService.getImgs(postId)
        .then((res) => {
          setImageList([...imageList, ...res.data]);
        })
        .catch((err) => console.log(err));
    }
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsShow(false);
    }
  }, []);

  useEffect(() => {
    if (isShow && isFetching) {
      setIsFetching(false);
    } else if (isShow) {
      document.body.classList.add(styles.BodyStyles);
      document.addEventListener("keydown", escFunction, false);
      window.scrollTo({
        behavior: "smooth",
        top: container.current.offsetTop,
      });
    }
    setCurSlide(0);
    return () => {
      document.body.classList.remove(styles.BodyStyles);
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [isShow, isFetching, escFunction]);

  const handlePrev = () => {
    let prev = curSlide - 1;
    if (prev < 0) {
      prev = imageList.length - 1;
    }
    setCurSlide(prev);
  };

  const handleNext = () => {
    let next = curSlide + 1;
    if (next > imageList.length - 1) {
      next = 0;
    }
    setCurSlide(next);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const handleThumnail = (imgId) => {
    const imgIndex = imageList.findIndex((item) => item.imageId === imgId);
    setCurSlide(imgIndex);
  };

  const renderImgList = imageList.map((item, index) => {
    const bgImgUrl = _baseURL + item.imageUrl.replace(/\\/g, "/");
    return (
      <Fragment key={index}>
        <div
          className={clsx({
            [styles.ImgActive]: curSlide === index,
            [styles.BgBlur]: isShow,
          })}
          style={{ backgroundImage: `url('${bgImgUrl}')` }}
        ></div>
        <img
          onClick={() => getImgs()}
          className={clsx(styles.Img, {
            [styles.ImgActive]: curSlide === index,
          })}
          src={_baseURL + item.imageUrl}
          alt={"Hình thứ " + index}
        />
      </Fragment>
    );
  });

  const renderThumnail = imageList.map((item, index) => (
    <div
      key={index}
      onClick={() => handleThumnail(item.imageId)}
      className={clsx(styles.ThumnailOverlay, {
        [styles.ThumnailActive]: curSlide === index,
      })}
    >
      <span>{index + 1}</span>
      <img src={_baseURL + item.imageUrl} alt={"Hình thứ " + index} />
    </div>
  ));

  const btnArr = [
    { id: "prev", icon: NavigateBefore, style: "Prev", handle: handlePrev },
    { id: "next", icon: NavigateNext, style: "Next", handle: handleNext },
    { id: "close", icon: Close, style: "Close", handle: handleClose },
    { id: "zoomin", icon: ZoomIn, style: "ZoomIn", handle: handleClose },
    { id: "zoomout", icon: ZoomOut, style: "ZoomOut", handle: handleClose },
  ];

  const renderBtns = btnArr.map((item) => (
    <IconButton
      key={item.id}
      className={clsx(styles.Nav, styles[item.style])}
      onClick={() => item.handle()}
    >
      <item.icon className={styles.Icon} />
    </IconButton>
  ));

  return (
    <Fragment>
      <div
        className={clsx(styles.ShowOverlay, {
          [styles.HideOverlay]: !isShow,
        })}
      ></div>
      <div
        ref={container}
        className={clsx(styles.Container, {
          [styles.Bubble]: isShow,
        })}
      >
        <div
          className={clsx(styles.ImgSlides, {
            [styles.ImgSlidesShow]: isShow,
          })}
        >
          {renderImgList}
          {numImgs > 1 && isShow && <Fragment>{renderBtns}</Fragment>}
        </div>
        {numImgs > 1 &&
          (!isShow ? (
            <Button
              fullWidth
              onClick={() => getImgs()}
              className={styles.MoreImgBtn}
            >
              Còn +{numImgs - 1} ảnh nữa
            </Button>
          ) : (
            <div className={styles.Thumnail}>{renderThumnail}</div>
          ))}
      </div>
    </Fragment>
  );
};

export default Gallery;
