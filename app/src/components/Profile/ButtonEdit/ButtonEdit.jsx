import { Button } from "@mui/material";
import React from "react";
import styles from "../profile.module.css";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { useContext } from "react";
import { ProfileContext } from "../../contexts/profileContext";
import { useDispatch, useSelector } from "react-redux";
import { changeUserNameAboutQuery } from "../../../redux/actions/personAC.ts";
import { useEffect } from "react";
import { setStatusEmpty } from "../../../redux/actions/requestStatusAC.ts";

const ButtonEdit = () => {
  const {
    btnActive,
    setBtnActive,
    createObjUser,
    resetObjUser,
    btnNameAbout,
    setBtnNameAbout,
  } = useContext(ProfileContext);

  const dispatch = useDispatch();
  const status = useSelector((store) => store.requestStatus);

  useEffect(() => {
    // Перебивает т.к. в стейте fulfiled нужно очистить его
    switch (status) {
      case "pending":
        setLoading(true);
        break;

      default:
        setLoading(false);
    }
  }, [status, btnActive]);

  const submitHandler = () => {
    btnActive === true ? setBtnActive(false) : setBtnActive(true);
    btnNameAbout === true ? setBtnNameAbout(false) : setBtnNameAbout(true);

    resetObjUser();
  };

  const [loading, setLoading] = React.useState(false);

  function handleClick() {
    // setBtnNameAbout(true);
    dispatch(changeUserNameAboutQuery(createObjUser()));
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
            Назад
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
