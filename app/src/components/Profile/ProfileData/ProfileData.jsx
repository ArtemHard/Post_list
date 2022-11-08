import { Box, Grid, TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileContext } from "../../contexts/profileContext";
import ModalAvatar from "../ModalAvatar/ModalAvatar";
import styles from "../profile.module.css";
import { ProfileList } from "./ProfileList/ProfileList";

export const ProfileData = () => {
  const {
    person,
    newName,
    setNewName,
    newAbout,
    setNewAbout,
    btnNameAbout,
    modal,
    setModal,
  } = useContext(ProfileContext);

  const changeAbout = (e) => {
    setNewAbout(e.target.value);
  };
  const changeName = (e) => {
    setNewName(e.target.value);
  };

  const clickHandler = () => {
    if (btnNameAbout === false) {
      modal === true ? setModal(false) : setModal(true);
    }
  };

  const text = "Нажмите\nдля \nзамены";
  // const status = useSelector(store => store.requestStatus)
  // const [person, setPerson] = useState(personProps)
  // useEffect(() => {
  //   setPerson(personProps)
  // }, [personProps])

  // console.log(person.name);
  // console.log(person.avatar);
  // console.log(person.about);
  // console.log(person.email);
  // console.log(newName);
  return (
    <Grid container spacing={3} justifyContent='center'>
      {
        <ModalAvatar
          avatarUrl={person.avatar}
          modal={modal}
          closeModal={clickHandler}
        />
      }
      <div
        className={
          btnNameAbout
            ? styles.avatar__container
            : styles.avatar__containerHover
        }
        onClick={clickHandler}
      >
        <img
          className={btnNameAbout ? styles.avatar : styles.avatar_blur}
          src={person.avatar}
          alt='avatar'
        />
        {btnNameAbout ? null : <span className={styles.textClick}>{text}</span>}
      </div>
      <Box
        component='form'
        sx={{
          m: 3,
          // width: "25ch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          disabled={btnNameAbout}
          id='outlined-disabled'
          label='Имя'
          name='name'
          value={newName}
          onChange={changeName}
        />
        <TextField
          disabled={btnNameAbout}
          id='outlined-disabled'
          label='Профессия'
          name='About'
          value={newAbout}
          onChange={changeAbout}
        />
        <TextField
          disabled
          id='outlined-disabled'
          label='avatar'
          value={person.avatar}
        />
        <TextField
          disabled
          id='outlined-disabled'
          label='Почта'
          value={person.email}
        />
        <ProfileList person={person}/>
      </Box>
    </Grid>
  );
};
