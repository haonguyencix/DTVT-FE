import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

const Sticky = (props) => {
  const { children, className, top, width, overlay } = props;
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);

  const handleScroll = () => {
    if (ref && ref.current && ref.current.getBoundingClientRect()) {
      setSticky(ref.current.getBoundingClientRect().top <= top);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      style={{ width }}
      className={clsx(styles.Wrapper, {
        [styles.IsSticky]: isSticky,
      })}
    >
      <div
        style={{ width, top }}
        className={clsx(styles.Inner, {
          [className]: isSticky,
        })}
      >
        <div className={overlay}></div>
        {children}
      </div>
    </div>
  );
};

export default Sticky;
