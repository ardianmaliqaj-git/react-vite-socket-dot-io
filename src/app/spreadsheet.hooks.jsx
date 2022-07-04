import { useState, useRef, useEffect } from "react";

let useClientRect = function () {
  let setClient = useRef();
  let [rect, setRect] = useState({});

  useEffect(function () {
    let callback = function () {
      let { top, left, right, bottom } =
        setClient.current.getBoundingClientRect();
      setRect(
        setClient && setClient.current ? { top, left, right, bottom } : {}
      );
    };
    callback();
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, []);
  return [rect, setClient];
};

let useDisableContextMenu = function (client) {
  useEffect(function () {
    client.addEventListener("contextmenu", (e) => e.preventDefault());
    return () =>
      client.removeEventListener("contextmenu", (e) => e.preventDefault());
  }, []);
};

let useKeyCode = function (onEventType) {
  let [code, setCode] = useState();
  let [change, causeChange] = useState();
  useEffect(function () {
    let callback = function (e) {
      e?.preventDefault();
      e?.stopPropagation();
      setCode(e?.code);
      causeChange(e?.timeStamp);
    };
    window.addEventListener(onEventType, callback);
    callback();
    return () => window.removeEventListener(onEventType, callback);
  }, []);
  return [code, change];
};

export { useClientRect, useKeyCode, useDisableContextMenu };
