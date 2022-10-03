import { Button } from "@mui/material";
import React from "react";
import styles from "../profile.module.css";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

const ButtonEdit = ({ btnActive, setBtnActive }) => {
  const submitHandler = () => {
    btnActive === true ? setBtnActive(false) : setBtnActive(true);
  };

  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

  return (
    <div className={styles.profile__btn_container}>
      {btnActive === true ? (
        <Button
          onClick={submitHandler}
          variant='contained'
          size='large'
          // disabled={disabled}
        >
          Редактировать
        </Button>
      ) : (
        <>
          <Button
            onClick={submitHandler}
            variant='contained'
            size='large'
            // disabled={disabled}
          >
            Отмена
          </Button>
          <LoadingButton
            onClick={handleClick}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition='end'
            variant='contained'
          >
            Внести изменения
          </LoadingButton>
        </>
      )}
    </div>
  );
};

export default ButtonEdit;
