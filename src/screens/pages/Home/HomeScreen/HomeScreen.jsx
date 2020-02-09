import React from "react";
import styles from "./HomeScreen.module.scss";

// import components
import Post from "../../../atoms/Post/Post";

import AvtDefaut from "../../../../assets/img/avt-default-2.png";
import PostImg1 from "../../../../assets/img/post-img-1.png";
import AvtHao from "../../../../assets/img/avt-hao.png";
import PostImg2 from "../../../../assets/img/post-img-2.png";

const postArr = [
  {
    avt: AvtDefaut,
    postedBy: "Nguyễn Thiện Hảo",
    postedAt: "11:24 PM",
    content: "3 năm là 1 chặng đường, nhanh như chớp mắt, thay đổi quá nhiều, sắp lấy vợ đến nơi rồi ae êi\nAe về gấp k họp mặt được cho cái lịch cụ thể bù đi!",
    attachment: PostImg1
  },
  {
    avt: AvtHao,
    postedBy: "Hồ Nhất Hào",
    postedAt: "29 Tháng 9, 2019",
    content: "Ăn món mình thích là niềm vui, có bạn ăn cùng là hạnh phúc ",
    attachment: PostImg2
  },
  {
    avt: AvtDefaut,
    postedBy: "Nguyễn Thiện Hảo",
    postedAt: "11:24 PM",
    content: "3 năm là 1 chặng đường, nhanh như chớp mắt, thay đổi quá nhiều, sắp lấy vợ đến nơi rồi ae êi\nAe về gấp k họp mặt được cho cái lịch cụ thể bù đi!",
    attachment: PostImg1
  },
  {
    avt: AvtHao,
    postedBy: "Hồ Nhất Hào",
    postedAt: "29 Tháng 9, 2019",
    content: "Ăn món mình thích là niềm vui, có bạn ăn cùng là hạnh phúc ",
    attachment: PostImg2
  },
];

const HomeScreen = () => {
  const renderPost = postArr.map((item, index) => (
    <Post key={index} item={item} />
  ));
  return <div className={styles.Container}>{renderPost}</div>;
};

export default HomeScreen;
