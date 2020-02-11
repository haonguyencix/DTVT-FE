import React from "react";
import styles from "./Classrooms.module.scss";

import Classroom from "./Classroom/Classroom";

const classArr = [
  {
    name: "Kỹ thuật chuyển mạch",
    lecture: "Nguyễn Nhật Tiến",
    time: {
      hai: [1, 2],
      sáu: [4, 5]
    }
  },
  {
    name: "Kỹ thuật phát thanh và truyền hình số",
    lecture: "Huỳnh Hồng Nhu",
    time: {
      ba: [6, 7],
      tư: [4, 5]
    }
  },
  {
    name: "Giải tích mạch điện",
    lecture: "Nguyễn Hữu Phúc",
    time: {
      năm: [1, 2],
      bảy: [4, 5]
    }
  },
  {
    name: "Cấu kiện điện tử",
    lecture: "Lê Quốc Đán",
    time: {
      năm: [1, 2],
      bảy: [4, 5]
    }
  },
  {
    name: "Phương pháp nghiên cứu khoa học",
    lecture: "Võ Công Thương",
    time: {
      ba: [6, 7],
      tư: [4, 5]
    }
  },
  {
    name: "An toàn lao động",
    lecture: "Nguyễn Thị Hậu",
    time: {
      ba: [6, 7],
      tư: [4, 5]
    }
  },
  {
    name: "Cấu trúc dữ liệu và giải thuật ứng dụng",
    lecture: "Trần Minh Nhật",
    time: {
      hai: [3, 4],
      sáu: [9, 10]
    }
  },
  {
    name: "Lập trình cơ sở dữ liệu",
    lecture: "Nguyễn Thanh Nam",
    time: {
      ba: [6, 7],
      tư: [4, 5]
    }
  },
  {
    name: "Đồ án 1",
    lecture: "Nguyễn Xuân Tiên",
    time: {
      ba: [6, 7],
      tư: [4, 5]
    }
  },
  {
    name: "Thông tin di động số",
    lecture: "Dương Stupid Thuận",
    time: {
      ba: [6, 7],
      tư: [4, 5]
    }
  }
];

const Classrooms = () => {
  const renderClassrooms = classArr.map((item, index) => (
    <Classroom key={index} item={item} />
  ));
  return <div className={styles.Container}>{renderClassrooms}</div>;
};

export default Classrooms;
