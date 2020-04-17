import React from "react";
import styles from "./styles.module.scss";

// import components
import Classroom from "./Classroom";

const classArr = [
  {
    name: "Kỹ thuật chuyển mạch",
    lecture: "Nguyễn Nhật Tiến",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
  {
    name: "Kỹ thuật phát thanh và truyền hình số",
    lecture: "Huỳnh Hồng Nhu",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
  {
    name: "Giải tích mạch điện",
    lecture: "Nguyễn Hữu Phúc",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
  {
    name: "Cấu kiện điện tử",
    lecture: "Lê Quốc Đán",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
  {
    name: "Phương pháp nghiên cứu khoa học",
    lecture: "Võ Công Thương",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
  {
    name: "An toàn lao động",
    lecture: "Nguyễn Thị Hậu",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
  {
    name: "Cấu trúc dữ liệu và giải thuật ứng dụng",
    lecture: "Trần Minh Nhật",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
  {
    name: "Lập trình cơ sở dữ liệu",
    lecture: "Nguyễn Thanh Nam",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
  {
    name: "Đồ án 1",
    lecture: "Nguyễn Xuân Tiên",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
  {
    name: "Thông tin di động số",
    lecture: "Dương Stupid Thuận",
    time: [
      { day: "hai", start: 1, count: 3 },
      { day: "ba", start: 3, count: 2 },
    ],
  },
];

const Classrooms = () => {
  const renderClassrooms = classArr.map((item, index) => (
    <Classroom key={index} item={item} />
  ));
  return <div className={styles.Container}>{renderClassrooms}</div>;
};

export default Classrooms;
