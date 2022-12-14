import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import React from "react";
import styles from "../modalavatar.module.css";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { changeAvatarQuery } from "../../../../redux/actions/personAC.ts";
import CloseIcon from "@mui/icons-material/Close";

export const AvatarForm = ({ avatarUrl }) => {
  const status = useSelector((store) => store.requestStatus);
  const url = avatarUrl.avatarUrl;
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    status === "pending" ? setLoading(true) : setLoading(false);
  }, [status]);

  const dispatch = useDispatch();

  const SubmitHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());

    const dataForServer = {
      avatar: formData.url,
    };
    dispatch(changeAvatarQuery(dataForServer));
    e.currentTarget.reset()
  };
  const escHandler = (e) => {
    console.log(e.currentTarget.id);
    if (e.key === "Escape" || e.currentTarget.id === "svg_closeIcon")
      avatarUrl.closeModal();
  };
  useEffect(() => {
    window.document.addEventListener("keydown", escHandler);
    return () => {
      window.document.removeEventListener("keydown", escHandler);
    };
  }, []);

  return (
    <div className={styles.wrapper} id='modal_wrapper'>
      <CloseIcon
        className={styles.closeIcon}
        id='svg_closeIcon'
        onClick={escHandler}
      />
      <form className={styles.inner} onSubmit={SubmitHandler}>
        <TextField id='outlined-disabled' label='' name='url' />
        <LoadingButton
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition='end'
          variant='contained'
          type='submit'
        >
          Внести изменения
        </LoadingButton>
      </form>
    </div>
  );
};
