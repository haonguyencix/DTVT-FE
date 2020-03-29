import React, { useEffect, useRef } from "react";

const Clock = props => {
  const canvas = useRef();

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // bán kính
    let radius = canvas.current.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.85;

    // vẽ mặt đồng hồ
    const drawClockFace = (ctx, radius) => {
      // mặt đồng hồ
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.1, 0, 2 * Math.PI);
      ctx.fillStyle = props.bgColor;
      ctx.fill();

      // viền đồng hồ
      ctx.strokeStyle = props.borderColor;
      ctx.lineWidth = radius * 0.08;
      ctx.stroke();

      // tâm đồng hồ
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
      ctx.fillStyle = "#000";
      ctx.fill();
    };

    // vẽ kim đồng hồ
    const drawHand = (ctx, pos, length, width) => {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.moveTo(0, 0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
    };

    // ghi số giờ lên đồng hồ
    function drawClockNumber(ctx, radius) {
      let ang;
      let num;

      ctx.font = radius * 0.25 + "px arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = props.numColor;

      for (num = 1; num < 13; num++) {
        ang = (num * (2 * Math.PI)) / 12;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
    }

    // tính giờ đồng hồ (kim chạy)
    const drawClockTime = (ctx, radius) => {
      let now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();

      // kim giờ
      hour =
        (hour * Math.PI) / 6 +
        (minute * Math.PI) / (6 * 60) +
        (second * Math.PI) / (360 * 60);
      drawHand(ctx, hour, radius * 0.5, radius * 0.07);

      // kim phút
      minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
      drawHand(ctx, minute, radius * 0.8, radius * 0.07);

      // kim giây
      second = (second * Math.PI) / 30;
      drawHand(ctx, second, radius * 0.9, radius * 0.02);
    };

    // vẽ đồng hồ
    const drawClock = _ => {
      drawClockFace(ctx, radius);
      drawClockNumber(ctx, radius);
      drawClockTime(ctx, radius);
    };

    const interval = setInterval(drawClock, 1000);

    return () => clearInterval(interval);
  });

  return (
    <canvas
      ref={canvas}
      className={props.className}
      width={props.size}
      height={props.size}
    />
  );
};

export default Clock;
