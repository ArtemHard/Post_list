import React from "react";
import ReactDOM from "react-dom";
import { AvatarForm } from "./AvatarForm/AvatarForm";

const ModalAvatar = (props) => {
  return ReactDOM.createPortal(
    props.modal && <AvatarForm avatarUrl={props} />,
    document.getElementById("modal-root")
  );
};

export default ModalAvatar;
