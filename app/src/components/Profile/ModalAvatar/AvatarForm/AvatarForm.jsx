import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import React from "react";
import styles from "../modalavatar.module.css";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { changeAvatarQuery } from "../../../../redux/actions/personAC";
import CloseIcon from "@mui/icons-material/Close";

export const AvatarForm = ({ avatarUrl }) => {
  const status = useSelector((store) => store.requestStatus);
  const url = avatarUrl.avatarUrl;
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    status === "pending" ? setLoading(true) : setLoading(false);
  }, [status]);

  //   const changeAdress = (e) => {
  //     setAdress(e.target.value);
  //   };

  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.elements.url.value = url;
  }, [url]);
  const dispatch = useDispatch();

  const SubmitHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());

    const dataForServer = {
      avatar: formData.url,
    };
    console.log(dataForServer);
    dispatch(changeAvatarQuery(dataForServer));
  };
  const closeModalClickHandler = (e) => {
    e.preventDefault();
    if (e.target.id === "modal_wrapper") avatarUrl.closeModal();
  };
  const escHandler = (e) => {
    console.log(e.key);
    if (e.key === "Escape") avatarUrl.closeModal();
  };
  useEffect(() => {
    window.document.addEventListener("keydown", escHandler);
    return () => {
      window.document.removeEventListener("keydown", escHandler);
    };
  }, []);

  return (
    <div
      className={styles.wrapper}
      id='modal_wrapper'
      onClick={closeModalClickHandler}
    >
      <form ref={formRef} className={styles.inner} onSubmit={SubmitHandler}>
        <TextField
          id='outlined-disabled'
          label=''
          name='url'
          // defaultValue={url}
          // value={adress}
          // onChange={changeAdress}
        />
        <LoadingButton
          // onClick={handleClick}
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
