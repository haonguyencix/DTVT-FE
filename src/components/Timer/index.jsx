import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Timer = props => {
  let { expirationTime } = props;

  const [timer, setTimer] = useState({
    min: "0" + Math.round(expirationTime / 60 - 0.5),
    sec: "0" + (expirationTime % 60)
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let min = Math.round((expirationTime - 1) / 60 - 0.5);
      let sec = (expirationTime - 1) % 60;

      setTimer({
        min: min < 10 ? "0" + min : min,
        sec: sec < 10 ? "0" + sec : sec
      });

      --expirationTime;

      if (expirationTime <= 0) {
        clearInterval(interval);
        toast.error("Mã xác thực đã hết hạn!");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expirationTime]);

  return (
    <span className={props.className}>
      {timer.min}:{timer.sec}
    </span>
  );
};

export default Timer;
