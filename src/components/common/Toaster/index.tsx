import React from "react";
import Toast from "react-bootstrap/Toast";

import './index.scss'

const Toaster: React.FC<any> = ({
  show,
  setShow,
  hasError,
  message
}: {
  show: boolean;
  setShow: (arg0: boolean) => void;
  hasError: boolean;
  message: string
}) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        minHeight: "200px",
        minWidth: "200px",
        left: 20,
        bottom: 0,
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: -90,
        }}
      >
        <Toast
          show={show}
          onClose={() => setShow(false)}
          delay={3000}
          autohide
          className={hasError ? "hasError" : ""}
        >
          <Toast.Header>{message}</Toast.Header>
        </Toast>
      </div>
    </div>
  );
};

export default Toaster;
