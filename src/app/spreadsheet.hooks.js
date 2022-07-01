import { useState, useRef, useEffect } from "react";

let useClientRect = function () {
  let element = useRef();
  let [rect, setRect] = useState({});

  useEffect(function () {
    let updateRect = function () {
      let { top, left, right, bottom } =
        element.current.getBoundingClientRect();
      setRect(element && element.current ? { top, left, right, bottom } : {});
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);
  return [rect, element];
};

let useKeyCode = function (metaData) {
  let [code, setCode] = useState();
  let [change, causeChange] = useState();
  useEffect(function () {
    let updateCode = function (e) {
      let list = metaData?.onKeyCodeEvents;
      if (list?.length && !list.includes(e?.code)) return;
      setCode(e?.code);
      causeChange(e?.timeStamp);
    };
    let type = metaData?.onEventType ?? "keydown";
    window.addEventListener(type, updateCode);
    updateCode();
    return () => window.removeEventListener(type, updateCode);
  }, []);
  return [code, change];
};

export { useClientRect, useKeyCode };
