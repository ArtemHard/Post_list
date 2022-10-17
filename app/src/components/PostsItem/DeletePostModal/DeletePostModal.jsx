import ReactDOM from "react-dom";
import { InnerDeletPostModal } from "./InnerDeletPostModal/InnerDeletPostModal";

export const DeletePostModal = (props) => {
  return ReactDOM.createPortal(
    props.modal && <InnerDeletPostModal {...props} />,
    document.getElementById("modal-root")
  );
};
