import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "../modalavatar.module.css";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";

export const AvatarForm = ({ avatarUrl }) => {
  const status = useSelector((store) => store.requestStatus);
  const url = avatarUrl.avatarUrl;
  //   const [adress, setAdress] = useState(url);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    status === "pending" ? setLoading(true) : setLoading(false);
  }, [status]);

  //   const changeAdress = (e) => {
  //     setAdress(e.target.value);
  //   };

  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.elements.name.value = url;
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData.name);
  };
  return (
    <form ref={formRef} className={styles.inner} onSubmit={SubmitHandler}>
      <TextField
        id='outlined-disabled'
        label=''
        name='name'
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
  );
};
