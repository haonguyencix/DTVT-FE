import React, { Fragment, useEffect, useRef, useState } from "react";
import { Tooltip } from "@material-ui/core";

const CopyText = (props) => {
  const { value, children } = props;

  const textAreaRef = useRef(null);
  const [isCopy, setIsCopy] = useState(false);

  const copy = () => {
    textAreaRef.current.select();
    document.execCommand("copy");
    setIsCopy(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isCopy) {
        setIsCopy(false);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isCopy]);

  return (
    <Fragment>
      <Tooltip title={!isCopy ? "Click để sao chép" : "Đã sao chép"}>
        <div
          onClick={() => copy()}
          style={{ cursor: "pointer" }}
        >
          {children}
        </div>
      </Tooltip>
      <textarea
        readOnly
        ref={textAreaRef}
        value={value}
        style={{ position: "relative", zIndex: -1 }}
      />
    </Fragment>
  );
};

export default CopyText;
