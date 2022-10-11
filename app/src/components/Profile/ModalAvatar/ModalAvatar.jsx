import React from "react";
import ReactDOM from "react-dom";
import { AvatarForm } from "./AvatarForm/AvatarForm";
import styles from "./modalavatar.module.css";

const ModalAvatar = (avatarUrl, { modal }) => {
  if (!modal) return null;
  console.log({ modal });
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <AvatarForm avatarUrl={avatarUrl} />
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalAvatar;
